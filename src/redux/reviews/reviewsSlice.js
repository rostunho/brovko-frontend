import { createSlice } from '@reduxjs/toolkit';

import { fetchReviews, submitReview } from './reviewsOperations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, store => {
        store.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.reviews;
      })
      .addCase(fetchReviews.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(submitReview.pending, store => {
        store.loading = true;
      })
      .addCase(submitReview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.reviews;
      })
      .addCase(submitReview.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default reviewsSlice.reducer;
