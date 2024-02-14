import { createSlice } from '@reduxjs/toolkit';

import { fetchOrdersAuth } from './ordersOperations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const historyOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchOrdersAuth.pending, store => {
        store.loading = true;
      })
      .addCase(fetchOrdersAuth.fulfilled, (state, { payload }) => {
        console.log('payload', payload);
        state.loading = false;
        state.items = payload.orders;
      })
      .addCase(fetchOrdersAuth.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default historyOrdersSlice.reducer;
