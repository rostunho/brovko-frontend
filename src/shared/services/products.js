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
