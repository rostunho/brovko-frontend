/* eslint-disable no-unused-vars */
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
    // console.log('data into AddLocation :>> ', data);
  } catch (error) {
    console.log('error into addLocation api-function :', error);
  }
};

export const getLocationById = async body => {
  try {
    const { data } = await instance.get(`/locations/${body}`);
    // console.log('data into getLocationById :>> ', data);
    return data;
  } catch (error) {
    console.log('error into getLocationById api-function :', error);
  }
};

export const updateLocationById = async (id, body) => {
  try {
    const { data } = await instance.patch(`/locations/update/${id}`, body);

    if (!data) {
      return console.log(
        'Проблеми із зміною локації. API-функція не отримала відповіді'
      );
    }

    return console.log(`Локацію з ID: (${id}) успішно змінено`);
  } catch (error) {
    console.log('error into updateLocationById api-function :', error);
  }
};

export const removeLocations = async body => {
  try {
    const requestBody = { ids: body };
    console.log('requestBody :>> ', requestBody);

    const { data } = await instance.post('locations/delete', requestBody);
    console.log('data :>> ', data);
  } catch (error) {
    console.log(error);
  }
};
