import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'shared/services/api/brovko/products';

export const fetchAllProducts = createAsyncThunk(
  'products/fetch-all',
  async (page, thunkAPI) => {
    try {
      const data = await api.getAllProducts(page);

      // console.log('DATA IN THUNK >>> :', data);

      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async ({ categoryId = 'sets', page = 1 }, { rejectWithValue }) => {
    try {
      const products = await api.getProductsByCategory(categoryId, page);
      // console.log('fetchProductsByCategory IN THUNK >>> ::', products);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByKeywords = createAsyncThunk(
  'products/fetchByKeywords',
  async ({ search = 'sets', page = 1 }, { rejectWithValue }) => {
    try {
      const products = await api.getProductsByKeywords(search, page);
      // console.log('fetchProductsByCategory IN THUNK >>> ::', products);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
