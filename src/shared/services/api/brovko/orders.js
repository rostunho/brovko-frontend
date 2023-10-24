import axios from 'axios';
import instance from './instance';

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
  const url = 'http://localhost:5005/api/orders/add-order';
  const data = JSON.stringify(body);
  const headers = { 'Content-Type': 'application/json' };

  console.log('Body in AddNewOrder: ', body);

  // const response = await axios.post(url, data, { headers });
  // console.log('Add Order request response:', response);
};
