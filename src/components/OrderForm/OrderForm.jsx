import CustomerForm from './CustomerForm/CustomerForm';
import DeliveryForm from 'components/DeliveryForm/DeliveryForm';
import OrderButtons from './OrderButtons/OrderButtons';

export default function OrderForm() {
  return (
    <>
      <CustomerForm />
      <DeliveryForm />
      <OrderButtons />
    </>
  );
}
