import instance from './instance';

export const getActiveCategories = async () => {
  const { data } = await instance.get('/categories');
  console.log('data: ', typeof data);
  return data;
};
