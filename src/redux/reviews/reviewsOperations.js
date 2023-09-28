import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/reviews';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const data = await api.getReviews('/reviews');
      console.log('data', data);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
