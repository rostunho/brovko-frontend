import React, { useState } from 'react';
const MERCHANT_ACCOUNT = process.env.REACT_APP_MERCHANT_ACCOUNT;

console.log(MERCHANT_ACCOUNT);

export default function PayForm() {
  const formFields = [];

  const initialState = {
    merchantAccount: `${process.env.REACT_APP_MERCHANT_ACCOUNT}`,
    merchantAuthType: 'SimpleSignature',
    merchantDomainName: 'https://shkvarka.ua/',
    orderReference: '254',
    orderDate: '1415379863',
    amount: '6',
    currency: 'UAH',
    orderTimeout: '49000',
    productName: ['Фейковий продукт 01'],
    productPrice: ['3'],
    productCount: ['2'],
    clientFirstName: 'Іван',
    clientLastName: 'Франко',
    clientAddress: '',
    clientCity: '',
    clientEmail: 'some@mail.com',
    defaultPaymentSystem: 'card',
    // merchantSignature: '8d722152dc9d47e89bf9049984683446',
  };
  const [formData, setFormData] = useState(initialState);

  // const handleInputChange = e => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async e => {
    try {
      const response = await fetch(
        'http://localhost:5005/api/generate-signature',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const merchantSignature = data.signature;
        updateFormDataWithSignature(merchantSignature);
      } else {
        console.error('Помилка при отриманні merchantSignature');
      }
    } catch (error) {
      console.error('Помилка при виконанні запиту на бекенд:', error);
    }
  };

  const updateFormDataWithSignature = signature => {
    setFormData({ ...formData, merchantSignature: signature });
    submitWayforpayForm();
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

  // Додавання інших полів форми
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
        onSubmit={handleSubmit}
      >
        {formFields}
      </form>

      <button type="submit" onClick={handleSubmit}>
        Оплатити
      </button>
    </>
  );
}
