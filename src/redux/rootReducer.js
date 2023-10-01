import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/productsSlice';
import userReduser from './user/userSlice';
import reviewsReduser from './reviews/reviewsSlice';
import { basketReducer } from './basket/basketSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReduser,
  reviews: reviewsReduser,
  basket: basketReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'basket'],
};

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export default persistedAuthReducer;
