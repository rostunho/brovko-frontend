import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/api/brovko/reviews';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const data = await api.getReviews();
      // console.log('data', data);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const fetchAddReview = createAsyncThunk(
  'reviews/addReview',
  async (reviewData, thunkAPI) => {
    try {
      console.log(reviewData)
      for (const pair of reviewData.entries()) {
        const [name, value] = pair;
        if (value instanceof File) {
          console.log(`Field name: ${name}, File: ${value.name}`);
        } else {
          console.log(`Field name: ${name}, Value: ${value}`);
        }
      }
      const response = await api.submitReview(reviewData); // Додати відгук на сервер
      console.log('addReview response:', response);

      
        console.log('New review added successfully');
        
        
        // Отримати оновлені відгуки з сервера
        const updatedReviews = await api.getReviews();

        // Повернути дані відгука, для рендера на сторінці
        return { response, updatedReviews };
        
      
     
    
    }  catch (error) {
      console.error('Error adding review:', (error.response.status));
        return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);
