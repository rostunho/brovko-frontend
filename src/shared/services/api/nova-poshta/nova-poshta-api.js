import axios from 'axios';
import { isNumericString } from 'utils/string-format';

const NOVA_POSHTA_API = process.env.REACT_APP_NOVA_POSHTA_API;
const API_KEY = process.env.REACT_APP_NOVA_POSHTA_KEY;

export const findCity = async searchValue => {
  try {
    const bodyTemplate = {
      apiKey: API_KEY,
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: searchValue?.toLowerCase(),
        Limit: '50',
        Page: '1',
      },
    };
    const body = JSON.stringify(bodyTemplate);
    const { data } = await axios.post(NOVA_POSHTA_API, body);

    //якщо масив помилок не порожній, викидаємо помилку з нативним повідомленням
    if (data.errors.length > 0) {
      throw Error(data.errors);
    }
    //..

    const cities = data.data[0];
    return cities;
  } catch (error) {
    // одразу ж обробляємо викинуту помилку
    console.log(error.message);
  }
};

export const findStreet = async (searchValue, cityRef) => {
  try {
    const bodyTemplate = {
      apiKey: API_KEY,
      modelName: 'Address',
      calledMethod: 'searchSettlementStreets',
      methodProperties: {
        StreetName: searchValue.toLowerCase(),
        SettlementRef: cityRef,
        Limit: '50',
      },
    };

    const body = JSON.stringify(bodyTemplate);
    const { data } = await axios.post(NOVA_POSHTA_API, body);

    //якщо масив помилок не порожній, викидаємо помилку з нативним повідомленням
    if (data.errors.length > 0) {
      throw Error(data.errors);
    }
    //..

    const streets = data.data[0];
    return streets;
  } catch (error) {
    console.log(error.message);
  }
};

export const findWarehouse = async (searchValue, cityRef, postMachine) => {
  try {
    const valueIsNumber = isNumericString(searchValue);

    const bodyTemplate = {
      apiKey: API_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        SettlementRef: cityRef,
        // CityName: cityName, // назва міста, потрібна для пошуку по вулиці
        FindByString: !valueIsNumber ? searchValue : '', // можна шукати по назві вулиці (працює в комбінації із CityName)
        TypeOfWarehouseRef: postMachine
          ? 'f9316480-5f2d-425d-bc2c-ac7cd29decf0'
          : '',
        Page: '1',
        Limit: '100',
        Language: 'UA',
        WarehouseId: valueIsNumber ? searchValue : '',
      },
    };

    const body = JSON.stringify(bodyTemplate);

    const { data } = await axios.post(NOVA_POSHTA_API, body);

    //якщо масив помилок не порожній, викидаємо помилку з нативним повідомленням
    if (data.errors.length > 0) {
      throw Error(data.errors);
    }
    //..

    // console.log('data.data WAREHOUSE :>> ', data.data);

    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMainWarehouse = async cityRef => {
  const bodyTemplate = {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      SettlementRef: cityRef,
      Page: '1',
      Limit: '50',
      Language: 'UA',
    },
  };

  const body = JSON.stringify(bodyTemplate);

  const { data } = await axios.post(NOVA_POSHTA_API, body);

  if (data.errors.length > 0) {
    throw Error(data.errors);
  }

  // console.log('data.data :>> ', {
  //   Description: data.data[0].Description,
  //   ShortAddress: data.data[0].ShortAddress,
  //   Ref: data.data[0].Ref,
  // });

  // console.log('data.data :>> ', data.data[0]);

  // return {
  //   Description: data.data[0].Description,
  //   ShortAddress: data.data[0].ShortAddress,
  //   Ref: data.data[0].Ref,
  // };

  return data.data[0];
};

getMainWarehouse('e71abb60-4b33-11e4-ab6d-005056801329');
