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

export const addNewProduct = async data => {
  console.log(JSON.stringify(data));

  try {
    const response = await axios.post(
      'https://brovko.salesdrive.me/product-handler',
      JSON.stringify(data)
    );
    console.log('Post request response:', response.data);
  } catch (error) {
    console.log(error.message);
  }

  return data;
};
