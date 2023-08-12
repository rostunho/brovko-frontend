import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products/productsSlice';
import userReduser from './user/userSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReduser,
});

export default rootReducer;
