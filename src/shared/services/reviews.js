import axios from 'axios';
import instance from './instance';

export const getReviews = async () => {
  try {
    const { data } = await instance.get('/reviews');
    return data;
  } catch (error) {
    console.error('Помилка отримання відгуків:', error);
    throw error;
  }
};

export const submitReview = async reviewData => {
  try {
    // запит на сервер для відправки відгуку
    const response = await instance.post('/reviews', reviewData);
    console.log('submit Review response:', response);

    if (response.status === 200 || 201) {
      return true;
    } else {
      console.error('Помилка при відправці відгуку:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Помилка при відправці відгуку:', error);
    throw error;
  }
};
