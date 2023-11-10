import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { selectIsLogin, selectUser } from 'redux/user/userSelectors';
import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/OrderForm/DeliveryForm';
import PaymentMethod from 'components/OrderForm/PaymentMethod';
import Button from 'shared/components/Button';
import PayForm from 'components/Pay/PayForm';
import {
  addNewOrder,
  generateAddOrderRequestBody,
} from 'shared/services/api/brovko/orders';

export default function OrderForm() {
  const [customer, setCustomer] = useState({});
  const [delivery, setDelivery] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const productsInBasket = useSelector(getAllOrders);
  const userIsLoggedIn = useSelector(selectIsLogin);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const createNewOrder = async event => {
    event.preventDefault();
    const addOrderRequestBody = generateAddOrderRequestBody(
      productsInBasket,
      customer,
      delivery,
      paymentMethod
    );

    const response = await addNewOrder(addOrderRequestBody);
    // console.log(data);
    return response?.data;
  };

  const getCustomerData = data => {
    setCustomer(data);
  };

  const getDeliveryData = data => {
    setDelivery(currentData => ({ ...currentData, ...data }));
  };

  const getPaymentMethod = data => {
    setPaymentMethod(data);
  };

  const savedPersonalData = {
    firstName: user.firstName || '',
    middleName: user.middleName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    email: user.email || '',
  };

  // const savedAddress = {
  //   buildingNumber: user.buildingNumber || '',
  //   flat: user.flat || '',
  // };

  return (
    <>
      <form onSubmit={createNewOrder}>
        <CustomerForm
          user={savedPersonalData}
          userIsLoggedIn={userIsLoggedIn}
          getData={getCustomerData}
        />
        <DeliveryForm
          savedData={{
            novaPoshta: user?.novaPoshta || null,
            building: user.buildingNumber || '',
            apartment: user.flat || '',
          }}
          // savedAddress={savedAddress}
          userIsLoggedIn={userIsLoggedIn}
          getData={getDeliveryData}
        />
        <PaymentMethod
          user={user}
          userIsLoggedIn={userIsLoggedIn}
          getData={getPaymentMethod}
        />

        <Button
          size="lg"
          mode="outlined"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate('/shop/product-list-page')}
        >
          Повернутись до покупок
        </Button>

        {paymentMethod.method === 'cash' && (
          <Button type="submit" size="lg">
            Підтверджую замовлення
          </Button>
        )}
      </form>
      {paymentMethod.method === 'online' && (
        <PayForm
          createNewOrder={createNewOrder}
          customer={customer}
          productsInBasket={productsInBasket}
        />
      )}
    </>
  );
}
