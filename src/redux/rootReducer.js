import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/productsSlice';
import userReduser from './user/userSlice';
import reviewsReduser from './reviews/reviewsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(persistConfig, userReduser);

const rootReducer = combineReducers({
  products: productsReducer,
  user: persistedAuthReducer,
  reviews: reviewsReduser,
});

export default rootReducer;
