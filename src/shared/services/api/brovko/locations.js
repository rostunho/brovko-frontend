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

export const addLocation = async body => {
  try {
    const { data } = await instance.post('/locations/add-location', body);
    console.log('data into AddLocation :>> ', data);
  } catch (error) {
    console.log('error into addLocation api-function :', error);
  }
};
