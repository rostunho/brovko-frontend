import axios from 'axios';
import instance from './instance';

const BROVKO_API = process.env.REACT_APP_BROVKO_API;

export const getAllCategories = async () => {
  try {
    const { data } = await instance.get('/categories');
    // console.log('categories.data into API operations :>> ', data.categories);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoryById = async categoryId => {
  try {
    const { data } = await instance.get(`/categories/${categoryId}`);
    // console.log('response :>> ', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

getCategoryById(270);

// Якщо передаємо update, після додавання нової категорії оновить базу даних, якщо не передаємо - просто додасть нову категорію.
export const addNewCategory = async (body, update) => {
  try {
    const searchQuery = update
      ? '?update=category&fetch=true'
      : '?update=category';

    const url = `${BROVKO_API}/categories/add-category${searchQuery}`;
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.post(url, data, { headers });

    // console.log('Post request response >>:', response.data);
    console.log(response.data.result.message);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
