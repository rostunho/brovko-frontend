import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/api/brovko/orders';

export const fetchOrdersAuth = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const data = await api.getAllOrdersAuth();
      console.log('getAllOrdersAuth', data);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
