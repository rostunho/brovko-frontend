import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsByKeywords,
} from './productsOperations';

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, store => {
        store.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.products;
        state.totalPages = payload.totalPage;
      })
      .addCase(fetchAllProducts.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchProductsByCategory.pending, store => {
        store.status = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.products;
        state.totalPages = payload.totalPage;
        // console.log('state.items', state.items);
      })
      .addCase(fetchProductsByCategory.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchProductsByKeywords.pending, store => {
        store.status = true;
      })
      .addCase(fetchProductsByKeywords.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.products;
        state.totalPages = payload.totalPage;
        // console.log('state.items keyWORDS', state.items);
      })
      .addCase(fetchProductsByKeywords.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default productsSlice.reducer;
