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
import searchReducer from './search/searchSlice';
import { basketReducer } from './basket/basketSlice';
import popupReducer from './popup/popupSlice';
import warningReducer from './warning/warningSlice';
import statusReducer from './status/statusSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'favouriteProducts'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReduser);

const rootReducer = combineReducers({
  products: productsReducer,
  user: persistedUserReducer,
  reviews: reviewsReduser,
  categories: categoriesReduser,
  search: searchReducer,
  basket: basketReducer,
  popups: popupReducer,
  warning: warningReducer,
  status: statusReducer,
});

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export default persistedAuthReducer;
