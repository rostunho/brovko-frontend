import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
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
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const productsInBasket = useSelector(getAllOrders);
  const navigate = useNavigate();

  const createNewOrder = async event => {
    event.preventDefault();

    const addOrderRequestBody = generateAddOrderRequestBody(
      productsInBasket,
      customer,
      delivery,
      paymentMethod
    );

    const { data } = await addNewOrder(addOrderRequestBody);

    setCurrentOrderId(data.data.orderId.toString());
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
        <CustomerForm getData={getCustomerData} />
        <DeliveryForm getData={getDeliveryData} />
        <PaymentMethod getData={getPaymentMethod} />

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
      {paymentMethod.method === 'online' && <PayForm />}
    </>
  );
}
