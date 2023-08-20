import instance from './instance';

export const addOrder = async data => {
  const { data: result } = await instance.post('/orders', data);
  return result;
};

export const getAllOrdersAuth = async () => {
  const { data } = await instance.post('/orders/auth');
  return data;
};
