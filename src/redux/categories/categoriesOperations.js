import { createAsyncThunk } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import * as api from 'shared/services/api/brovko/categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const data = await api.getActiveCategories();
      console.log('data categories=======>>>>', data);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
