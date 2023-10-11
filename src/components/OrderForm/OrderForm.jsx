import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/DeliveryForm';
import PaymentMethod from 'components/PaymentMethod';
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
