import axios from 'axios';
import instance from './instance';
import { addOrderRequestTemplate } from 'components/OrderForm/addOrderRequestTemplate';
import { parsePhoneNumber } from 'utils';

export const addOrder = async data => {
  const { data: result } = await instance.post('/orders', data);
  return result;
};

export const getAllOrdersAuth = async () => {
  const { data } = await instance.post('/orders/auth');
  return data;
};

// додати нове замовлення на SalesDrive
export const addNewOrder = async body => {
  try {
    const url = 'http://localhost:5005/api/orders/add-order';
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.post(url, data, { headers });
    console.log('Post request response:', response);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }

  // const response = await axios.post(url, data, { headers });
  // console.log('Add Order request response:', response);
};

export const generateAddOrderRequestBody = (
  products,
  customer,
  delivery,
  paymentMethod
) => {
  const requestBody = { ...addOrderRequestTemplate };

  requestBody.products = products.map(product => {
    return {
      id: product.id,
      name: product.name,
      costPerItem: product.price.toString(),
      amount: product.value.toString(),
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
  requestBody.phone = parsePhoneNumber(customer.phone);
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
  requestBody.novaposhta.BuildingNumber = delivery.building?.toString();
  requestBody.novaposhta.Flat = delivery.apartment?.toString();

  // console.log('requestBody :>> ', requestBody);
  return requestBody;
};

const test = Date.now();
console.log('test :>> ', test);
