import axios from 'axios';
import instance from './instance';

export const getAllProducts = async (page = 1) => {
  const { data } = await instance.get('/products', {
    params: {
      page,
    },
  });
  return data;
};

export const getProductsByCategory = async (category = 'sets', page = 1) => {
  const { data } = await instance.get('/products/category', {
    params: {
      category,
      page,
    },
  });
  return data;
};

export const deleteProductById = async id => {
  const { data } = instance.delete(`/products/${id}`);
  return data;
};

export const addNewProduct = async body => {
  console.log(JSON.stringify(body));

  const url = 'https://brovko.salesdrive.me/product-handler';
  const data = JSON.stringify(body);
  const headers = { 'Content-Type': 'application/json' };

  try {
    const response = await axios.post(url, data, { headers });
    console.log('Post request response:', response.data);
  } catch (error) {
    console.log(error.message);
  }

  return data;
};
