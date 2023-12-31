import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/api/brovko/reviews';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const data = await api.getReviews();
      // console.log('data', data);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const fetchAddReview = createAsyncThunk(
  'reviews/addReview',
  async (reviewData, thunkAPI) => {
    try {
      const response = await api.submitReview(reviewData); // Додати відгук на сервер
      console.log('addReview response:', response);

      if (response.status === 200 || 201) {
        console.log('New review added successfully');

        // Отримати оновлені відгуки з сервера
        const updatedReviews = await api.getReviews();

        // Повернути дані відгука, для рендера на сторінці
        return { response, updatedReviews };
      } else {
        console.error('Error adding review:', response.statusText);
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }
);
