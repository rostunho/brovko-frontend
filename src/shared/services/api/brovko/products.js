// import axios from 'axios';
import instance from './instance';

// const BROVKO_API = process.env.REACT_APP_BROVKO_API;

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

export const getProductById = async id => {
  const { data } = await instance.get(`/products/${id}`);
  return data;
};

export const deleteProductById = async id => {
  const { data } = instance.delete(`/products/${id}`);
  return data;
};

export const addNewProduct = async body => {
  try {
    // const url = `${BROVKO_API}/products/add-product`;
    const route = '/products/add-product';
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };

    const response = await instance.post(route, data, { headers });
    console.log('Post request response:', response.data);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
