import React, { useState, useEffect, useMemo } from 'react';
import Button from 'shared/components/Button';
const MERCHANT_ACCOUNT = process.env.REACT_APP_MERCHANT_ACCOUNT;

export default function PayForm({
  customer,
  productsInBasket,
  createNewOrder,
}) {
  const formFields = [];
  const initialState = useMemo(() => {
    return {
      merchantAccount: `${MERCHANT_ACCOUNT}`,
      merchantAuthType: 'SimpleSignature',
      merchantDomainName: 'https://shkvarka.ua/',
      orderReference: '',
      orderDate: Date.now(),
      amount: '',
      currency: 'UAH',
      orderTimeout: '49000',
      productName: [],
      productPrice: [],
      productCount: [],
      clientFirstName: '',
      clientLastName: '',
      clientAddress: '',
      clientCity: '',
      clientEmail: '',
      defaultPaymentSystem: 'card',
    };
  }, []);
  const [formData, setFormData] = useState({ ...initialState });

  useEffect(() => {
    const totalAmount = productsInBasket.reduce(
      (total, product) => total + product.price * product.value,
      0
    );

    const updatedInitialState = {
      ...initialState,
      productName: productsInBasket.map(product => product.name),
      productPrice: productsInBasket.map(product => product.price.toString()),
      productCount: productsInBasket.map(product => product.value.toString()),
      amount: totalAmount.toString(),
      clientFirstName: customer.firstName,
      clientLastName: customer.lastName,
      clientEmail: customer.email,
    };

    setFormData(updatedInitialState);
  }, [productsInBasket, customer, initialState]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Виклик функції `createNewOrder` та очікування результуючого об'єкта `data`
    const data = await createNewOrder();

    if (data && data.orderId) {
      console.log(data.orderId);

      // Оновлення `orderReference` з orderId перед генерацією підпису
      setFormData(prevData => ({
        ...prevData,
        orderReference: data.orderId,
      }));

      setTimeout(generateSignature(data), 5000);
    }
  };
  const generateSignature = async data => {
    try {
      const response = await fetch(
        'https://brovko-backend.onrender.com/api/generate-signature',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            orderReference: data.orderId, // Оновлюємо orderReference з orderId
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const merchantSignature = data.signature;
        updateFormDataWithSignature(merchantSignature);
        setTimeout(submitWayforpayForm, 1000);
      } else {
        console.error('Помилка при отриманні merchantSignature');
      }
    } catch (error) {
      console.error('Помилка при виконанні запиту на бекенд:', error);
    }
  };

  const updateFormDataWithSignature = signature => {
    setFormData(prevData => ({
      ...prevData,
      merchantSignature: signature,
    }));
  };

  const submitWayforpayForm = () => {
    const form = document.getElementById('wayforpay-form');
    form.submit();
  };

  formData.productName.forEach((productName, index) => {
    formFields.push(
      <input
        key={`productName[${index}]`}
        name={`productName[${index}]`}
        value={productName}
        type="hidden"
      />
    );
  });

  formData.productPrice.forEach((productPrice, index) => {
    formFields.push(
      <input
        key={`productPrice[${index}]`}
        name={`productPrice[${index}]`}
        value={productPrice}
        type="hidden"
      />
    );
  });

  formData.productCount.forEach((productCount, index) => {
    formFields.push(
      <input
        key={`productCount[${index}]`}
        name={`productCount[${index}]`}
        value={productCount}
        type="hidden"
      />
    );
  });

  Object.entries(formData).forEach(([name, value]) => {
    if (!['productName', 'productPrice', 'productCount'].includes(name)) {
      formFields.push(
        <input key={name} name={name} value={value} type="hidden" />
      );
    }
  });

  return (
    <>
      <form
        method="post"
        action="https://secure.wayforpay.com/pay"
        acceptCharset="utf-8"
        id="wayforpay-form"
      >
        {formFields}
      </form>
      <Button type="submit" size="lg" onClick={handleSubmit}>
        Оплатити
      </Button>
    </>
  );
}
