// import axios from 'axios';
import instance from './instance';

export const getReviews = async () => {
  try {
    const { data } = await instance.get('/reviews');

    // console.log('data in reviews-api :>> ', data);
    return data;
  } catch (error) {
    console.error('Помилка отримання відгуків:', error);
    throw error;
  }
};

export const getReviewsByProductId = async productId => {
  try {
    const { data } = await instance.get(`/reviews/${productId}`);
    // console.log('data getReviewsByProductId in reviews-api <<=::::=>> ', data);
    return data;
  } catch (error) {
    console.error('Помилка при отриманні відгуків за productId:', error);
    throw error;
  }
};

export const submitReview = async reviewData => {
  try {
    // запит на сервер для відправки відгуку
    const response = await instance.post('/reviews', reviewData);
    console.log('submit Review response:', reviewData);
    console.log('response.status', response);

    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      console.error('Помилка при відправці відгуку:', response);
      return false;
    }
  } catch (error) {
    console.error('Помилка при відправці відгуку:', error);
    throw error;
  }
};

const controlReview = async ({ productId, commentId, textId }, approved) => {
  try {
    const body = {
      productId: productId,
      commentId: commentId,
      textId: textId,
      approved: approved,
    };
    const response = await instance.patch(`/reviews/control/`, body);
    console.log('response into controlReview >>:', response);

    return response;
  } catch (error) {
    console.log('Error into controlReview');
  }
};

export const approveReview = async (productId, commentId, textId) => {
  const response = await controlReview({ productId, commentId, textId }, true);
  console.log('response into approvedReview', response);
  return response;
};

export const rejectReview = async (productId, commentId, textId) => {
  const response = await controlReview({ productId, commentId, textId }, false);
  console.log('response into rejectReview', response);
  return response;
};

export const getReviewsByStatus = async (status = 'new') => {
  // приймає лише значення "new", "approved", "rejected"

  // console.log('status into API-function :>> ', status);

  const body = { status: status };

  const response = await instance.patch('/reviews/by-status', body);
  // console.log('response into getReviewsByStatus', response);

  return response;
};

// тестування
// controlReview({
//   productId: '65774bcfac9f4692259ceb3c',
//   commentId: '658452733d5f62a6f9c3739f',
//   textId: '658452733d5f62a6f9c373a0',
// });
