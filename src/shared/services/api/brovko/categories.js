// import axios from 'axios';
import instance from './instance';

// const BROVKO_API = process.env.REACT_APP_BROVKO_API;

export const getActiveCategories = async () => {
  try {
    const { data } = await instance.get('/categories');
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addNewCategory = async body => {
  try {
    // const url = `${BROVKO_API}/categories/add-category`;
    const route = '/categories/add-category';
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };

    const response = await instance.post(route, data, { headers });
    console.log('Post request response:', response.data);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
