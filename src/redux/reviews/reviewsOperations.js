import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/reviews';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const data = await api.get('/reviews');
      return data;
      //   console.log('data', data);
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
