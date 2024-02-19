import instance from './instance';

export const getAllLocations = async () => {
  try {
    const response = await instance.get('/locations');
    // console.log('data locations', response.data);
    return response.data;
  } catch (error) {
    console.error('помилка отримання локацій', error);
    throw error;
  }
};
