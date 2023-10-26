import { useState } from 'react';
import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/OrderForm/DeliveryForm';
import PaymentMethod from 'components/OrderForm/PaymentMethod';
import OrderButtons from './OrderButtons/OrderButtons';
import PayForm from 'components/Pay/PayForm';

export default function OrderForm() {
  const [customer, setCustomer] = useState({});
  const [delivery, setDelivery] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
<<<<<<< Updated upstream
=======
  const productsInBasket = useSelector(getAllOrders);
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
    // setCurrentOrderId(data.data.orderId.toString());
    return data;
  };
>>>>>>> Stashed changes

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
        <OrderButtons />
      </form>
<<<<<<< Updated upstream
      <PayForm />
=======
      {paymentMethod.method === 'online' && (
        <PayForm
          createNewOrder={createNewOrder}
          customer={customer}
          productsInBasket={productsInBasket}
        />
      )}
>>>>>>> Stashed changes
    </>
  );
}
