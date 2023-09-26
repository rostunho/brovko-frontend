import axios from 'axios';

const NOVA_POSHTA_API = process.env.REACT_APP_NOVA_POSHTA_API;
const API_KEY = process.env.REACT_APP_NOVA_POSHTA_KEY;

export const searchCity = async searchValue => {
  try {
    const template = {
      apiKey: API_KEY,
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: searchValue.toLowerCase(),
        Limit: '50',
        Page: '1',
      },
    };
    const body = JSON.stringify(template);
    const { data } = await axios.post(NOVA_POSHTA_API, body);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
