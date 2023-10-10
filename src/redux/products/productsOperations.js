import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'shared/services/api/brovko/products';

export const fetchAllProducts = createAsyncThunk(
  'products/fetch-all',
  async (page, thunkAPI) => {
    try {
      const data = await api.getAllProducts(page);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
