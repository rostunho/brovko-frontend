import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import thunk from 'redux-thunk'

import persistedAuthReducer from './rootReducer';

export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    thunk, // Додайте middleware для Redux Thunk
  ],
});

export const persistor = persistStore(store);
