import { createSlice } from '@reduxjs/toolkit';

import { fetchAllProducts } from './productsOperations';

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
        state.items = payload;
      })
      .addCase(fetchAllProducts.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default productsSlice.reducer;
