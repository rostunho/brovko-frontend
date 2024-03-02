import { createSlice } from '@reduxjs/toolkit';

import { fetchReviews, fetchAddReview } from './reviewsOperations';

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
      .addCase(fetchAddReview.pending, store => {
        store.loading = true;
      })
      .addCase(fetchAddReview.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items = payload.updatedReviews?.reviews || [];
        // console.log('payload', payload)
      })
      .addCase(fetchAddReview.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload || 'Помилка при додаванні відгуку';
        console.error('Error in Slice', payload);
      });
  },
});

export default reviewsSlice.reducer;
