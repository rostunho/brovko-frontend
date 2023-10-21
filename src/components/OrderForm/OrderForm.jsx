import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/OrderForm/DeliveryForm';
import PaymentMethod from 'components/OrderForm/PaymentMethod';
import OrderButtons from './OrderButtons/OrderButtons';

export default function OrderForm() {
  return (
    <>
      <CustomerForm />
      <DeliveryForm />
      <PaymentMethod />
      <OrderButtons />
    </>
  );
}
