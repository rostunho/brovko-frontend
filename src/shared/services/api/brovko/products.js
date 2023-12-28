import axios from 'axios';
import instance from './instance';

const BROVKO_API = process.env.REACT_APP_BROVKO_API;

export const getAllProducts = async (
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc'
) => {
  const { data } = await instance.get('/products', {
    params: {
      page,
      perPage,
      sortBy,
      sortOrder,
    },
  });

  return data;
};

export const getProductsByCategory = async (
  categoryId,
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc'
) => {
  try {
    const { data } = await instance.get(`/products/category/${categoryId}`, {
      params: {
        page,
        perPage,
        sortBy,
        sortOrder,
      },
    });

    // console.log('getProductsByCategory into API Operations:', data);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getProductsByKeywords = async (
  search = 'sets1',
  page = 1,
  perPage = 10
) => {
  try {
    const { data } = await instance.get(`/products/search`, {
      params: { search, page },
    });

    console.log('getProductsByKeywords:::::', data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async id => {
  const { data } = await instance.get(`/products/product/${id}`);
  // console.log('data in PRODUCTS >> :', data);
  return data;
};

// export const deleteProductById = async id => {
//   const { data } = instance.delete(`/products/${id}`);
//   return data;
// };

export const addNewProduct = async body => {
  try {
    // const url = `${BROVKO_API}/products/add-product`;
    const url = `${BROVKO_API}/products/add-product`;
    const data = JSON.stringify(body);

    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.post(url, data, { headers });
    console.log('Post request response:', response);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeProduct = async body => {
  try {
    const url = `${BROVKO_API}/products/remove-product`;
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.post(url, data, { headers });
    console.log('NEW RESPONSE IN PRODUCTS API >> :', response);
    console.log(response.data.message);
    console.log('REMOVE PRODUCT WORKING');
  } catch (error) {
    console.log(error.message);
  }
};
