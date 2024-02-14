import axios from 'axios';
import instance from './instance';
import { addProductRequestTemplate } from 'components/AddProductForm/addProductRequestTemplate';

const BROVKO_API = process.env.REACT_APP_BROVKO_API;

export const getAllProducts = async (
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  priceMin,
  priceMax
) => {
  try {
    const { data } = await instance.get('/products', {
      params: {
        page,
        perPage,
        sortBy,
        sortOrder,
        priceMin,
        priceMax,
      },
    });
    console.log('data :>> ', data);
    return data;
  } catch (error) {
    throw error;
  }
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

    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getProductsByKeywords = async (
  search = '',
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc'
) => {
  const headers = { 'Content-Type': 'application/json' };
  const params = { search, page, perPage, sortBy, sortOrder };

  try {
    const { data } = await instance.get(`/products/search`, {
      headers: headers,
      // params: JSON.stringify(params),
      params: params,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async id => {
  const { data } = await instance.get(`/products/product/${id}`);
  // console.log('data in product-api >> :', data);
  return data;
};

export const addNewProduct = async (body, files = []) => {
  try {
    const url = `${BROVKO_API}/products/add-product`;
    const bodyToSend = JSON.stringify(body);

    // const headers = { 'Content-Type': 'application/json' };
    const headers = { 'Content-Type': 'multipart/form-data' };

    const data = new FormData();

    data.append('requestBody', bodyToSend);
    // <<<<<<< fix_submit_backup
    // files.forEach(({ type, value }) => {
    // //   data.append(type === 'file' ? 'file' : 'url', value);
    // });

    files.forEach((item, index) => {
      if (item.file instanceof File) {
        // =======
        //     files.forEach(item => {
        //       if ('file' in item && item.file instanceof File) {
        //         console.log(item.file);
        // >>>>>>> main
        data.append(`picture`, item.file);
        const url = '';
        const obj = { sequenceNumber: index, url };
        data.append(`picture`, JSON.stringify(obj));
      } else if (typeof item.url === 'string') {
        const productURL = { sequenceNumber: index };
        productURL.sequenceNumber = index;
        const url = item.url;
        const obj = { sequenceNumber: index, url: item.url };
        data.append(`picture`, JSON.stringify(obj));
      }
    });
    // files.forEach(({ file, url }, index) => {
    //   if (file instanceof File) {
    //     const obj = { id: index, file };
    //     console.log(obj.id);
    //     // const id = {index:item.file}
    //     data.append(`picture`, obj);
    //   } else if (typeof url === 'string') {
    //     const obj = { id: index, url };
    //     console.log(obj.id);
    //     data.append(`picture`, obj);
    //   }
    // });
    // forEach(file => {
    //   data.append('files[]', file);
    // });
    // console.log(data);
    // for (const pair of data.entries()) {
    //   const [name, value] = pair;
    //   console.log(pair);
    //   if (value instanceof File) {
    //     console.log(`Field name: ${name}, File: ${value.name}`);
    //   } else {
    //     console.log(`Field name: ${name}, Value: ${value}`);
    //   }
    // }
    const response = await axios.post(url, data, { headers });
    console.log('Post request response:', response.data.status);
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
    console.log(response.data.message);
  } catch (error) {
    console.log(error.message);
  }
};
