// import { combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import productsReducer from './products/productsSlice';
// import userReduser from './user/userSlice';
// import reviewsReduser from './reviews/reviewsSlice';
// import { basketReducer } from './basket/basketSlice';
// import popupReducer from './popup/popupSlice';

// const rootReducer = combineReducers({
//   products: productsReducer,
//   user: userReduser,
//   reviews: reviewsReduser,
//   basket: basketReducer,
//   popups: popupReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['basket', 'user.token'],
// };

// const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

// export default persistedAuthReducer;

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/productsSlice';
import userReduser from './user/userSlice';
import reviewsReduser from './reviews/reviewsSlice';
import categoriesReduser from './categories/categoriesSlice';
import { basketReducer } from './basket/basketSlice';
import popupReducer from './popup/popupSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReduser);

const rootReducer = combineReducers({
  products: productsReducer,
  user: persistedUserReducer,
  reviews: reviewsReduser,
  categories: categoriesReduser,
  basket: basketReducer,
  popups: popupReducer,
});

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export default persistedAuthReducer;
