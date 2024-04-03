import axios from 'axios';
import instance from './instance';
import { addOrderRequestTemplate } from 'components/OrderForm/addOrderRequestTemplate';
import { parsePhoneNumber } from 'utils';

const BROVKO_API = process.env.REACT_APP_BROVKO_API;

export const addOrder = async data => {
  const { data: result } = await instance.post('/orders', data);
  return result;
};

export const getAllOrdersAuth = async () => {
  // console.log('Get all orders');
  const { data } = await instance.get('/orders/auth');
  // console.log('data', data);
  return data;
};

// додати нове замовлення на SalesDrive
export const addNewOrder = async body => {
  // console.log('body in addNewOrder :>> ', body);

  try {
    const url = `${BROVKO_API}/orders/add-order`;
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.post(url, data, { headers });
    // console.log('Post request response:', response);

    return response.data;
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data.message);
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
    // console.log(product);
    return {
      id: product.id,
      name: product.name,
      costPerItem: product.price.toString(),
      amount: product.value.toString(),
      // description: product.description,
      description: '',
      discount: '', // TO ADD
      sku: '',
      commission: '',
      picture: [...product.picture],
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
  requestBody.novaposhta.area = delivery.city.Area;
  requestBody.novaposhta.region = delivery.city.Region;
  //   ? delivery.city.Region + ' ' + delivery.city.RegionTypes
  //   : '';
  requestBody.novaposhta.city = delivery.city.Present;
  requestBody.novaposhta.WarehouseNumber = delivery.warehouse.Ref || '1';
  requestBody.novaposhta.Street = delivery.street.Present || '';
  requestBody.novaposhta.BuildingNumber = delivery.building?.toString() || '';
  requestBody.novaposhta.Flat = delivery.apartment?.toString() || '';

  // console.log('requestBody :>> ', requestBody);
  return requestBody;
};
