import { createSlice } from '@reduxjs/toolkit';

import { fetchCategories } from './categoriesOperations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, store => {
        store.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.categories;

        console.log('state.items___caregory', state.items);
      })
      .addCase(fetchCategories.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default categoriesSlice.reducer;
