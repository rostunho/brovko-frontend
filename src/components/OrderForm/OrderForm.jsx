import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/OrderForm/DeliveryForm';
import PaymentMethod from 'components/OrderForm/PaymentMethod';
// import OrderButtons from './OrderButtons/OrderButtons';
import Button from 'shared/components/Button';
import PayForm from 'components/Pay/PayForm';

export default function OrderForm() {
  const [customer, setCustomer] = useState({});
  const [delivery, setDelivery] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const navigate = useNavigate();

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
      <form>
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
