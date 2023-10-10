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
