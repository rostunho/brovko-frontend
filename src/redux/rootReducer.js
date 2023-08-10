import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products/productsSlice';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
