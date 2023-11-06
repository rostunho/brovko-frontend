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

  const createNewOrder = async () => {
    const addOrderRequestBody = generateAddOrderRequestBody(
      productsInBasket,
      customer,
      delivery,
      paymentMethod
    );

    const {
      data: { data },
    } = await addNewOrder(addOrderRequestBody);
    console.log(data);
    return data;
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

  return (
    <>
      <form onSubmit={createNewOrder}>
        <CustomerForm
          user={user}
          userIsLoggedIn={userIsLoggedIn}
          getData={getCustomerData}
        />
        <DeliveryForm
          user={user}
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
