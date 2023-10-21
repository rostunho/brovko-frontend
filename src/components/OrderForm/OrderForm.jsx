import { useState } from 'react';
import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/OrderForm/DeliveryForm';
import PaymentMethod from 'components/OrderForm/PaymentMethod';
import OrderButtons from './OrderButtons/OrderButtons';

export default function OrderForm() {
  const [customer, setCustomer] = useState({});

  const getCustomerData = data => {
    setCustomer(data);
  };

  return (
    <>
      <CustomerForm getData={getCustomerData} />
      <DeliveryForm />
      <PaymentMethod />
      <OrderButtons />
    </>
  );
}
