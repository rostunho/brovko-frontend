import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
import CustomerForm from './CustomerForm/CustomerForm';
import { DeliveryForm } from 'components/OrderForm/DeliveryForm';
import PaymentMethod from 'components/OrderForm/PaymentMethod';
import Button from 'shared/components/Button';
import PayForm from 'components/Pay/PayForm';
// import { useAddOrderState } from 'shared/hooks/useAddOrderState';
import { addOrderRequestTemplate } from './addOrderRequestTemplate';

export default function OrderForm() {
  // const [orderBody, dispatchOrderBody] = useAddOrderState();
  const [customer, setCustomer] = useState({});
  const [delivery, setDelivery] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const productsInBasket = useSelector(getAllOrders);
  const navigate = useNavigate();

  console.log('productsInBasket :>> ', productsInBasket);

  const createAddOrderRequestBody = event => {
    event.preventDefault();
    const requestBody = { ...addOrderRequestTemplate };

    requestBody.products = productsInBasket.map(product => {
      return {
        id: product.id,
        name: product.name,
        costPerItem: product.price,
        amount: product.value,
        description: product.description,
        discount: '', // TO ADD
        sku: '',
        commission: '',
      };
    });

    requestBody.payment_method = paymentMethod.describe;
    requestBody.shipping_method = delivery.deliveryMethod.describe;
    requestBody.shipping_address = delivery.city.Present;
    requestBody.sajt = 'brovko.pet';
    requestBody.lName = customer.lastName;
    requestBody.fName = customer.firstName;
    requestBody.mName = customer.middleName;
    requestBody.phone = customer.phone;
    requestBody.email = customer.email;
    requestBody.novaposhta.ServiceType =
      delivery.deliveryMethod.method === 'address' ? 'Doors' : 'Warehouse';
    requestBody.novaposhta.area =
      delivery.city.Area + ' ' + delivery.city.ParentRegionTypes;
    requestBody.novaposhta.region =
      delivery.city.Region + ' ' + delivery.city.RegionTypes;
    requestBody.novaposhta.city = delivery.city.Ref;
    requestBody.novaposhta.WarehouseNumber = delivery.warehouse.Ref;
    requestBody.novaposhta.Street = delivery.street.Present;
    requestBody.novaposhta.BuildingNumber = delivery.building;
    requestBody.novaposhta.Flat = delivery.apartment;

    console.log('requestBody :>> ', requestBody);
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
      <form onSubmit={createAddOrderRequestBody}>
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
