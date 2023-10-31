import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/productsSlice';
import userReduser from './user/userSlice';
import reviewsReduser from './reviews/reviewsSlice';
import { basketReducer } from './basket/basketSlice';
import popupReducer from './popup/popupSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReduser,
  reviews: reviewsReduser,
  basket: basketReducer,
  popups: popupReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket', 'user'],
};

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export default persistedAuthReducer;

// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import productsReducer from './products/productsSlice';
// import userReduser from './user/userSlice';
// import reviewsReduser from './reviews/reviewsSlice';
// import { basketReducer } from './basket/basketSlice';
// import popupReducer from './popup/popupSlice';

// const userPersistConfig = {
//   key: 'user',
//   storage,
//   whitelist: ['token'],
// };

// const basketPersistConfig = {
//   key: 'basket',
//   storage,
// };

// const persistedUserReducer = persistReducer(userPersistConfig, userReduser);
// const persistedBasketReducer = persistReducer(
//   basketPersistConfig,
//   basketReducer
// );

// const rootReducer = combineReducers({
//   products: productsReducer,
//   user: persistedUserReducer,
//   reviews: reviewsReduser,
//   basket: persistedBasketReducer,
//   popups: popupReducer,
// });

// export default rootReducer;
