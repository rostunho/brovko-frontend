import instance from './instance';

export const getActiveCategories = async () => {
  const { data } = await instance.get('/categories');
  return data;
};
