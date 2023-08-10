import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'shared/services/products';

export const fetchAllProducts = createAsyncThunk(
  'products/fetch-all',
  async (_, thunkAPI) => {
    try {
      const data = await api.getAllProducts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
