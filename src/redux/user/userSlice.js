import { createSlice } from '@reduxjs/toolkit';

import {
  register,
  login,
  current,
  update,
  updateAvatar,
  logout,
  googleAuth,
  usersOrdersHistory,
  forgotPassword,
} from './userOperations';

const initialState = {
  user: {},
  token: '',
  ordersHistory: [],
  isLogin: false,
  loading: false,
  error: null,
  resetToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducers: {
  //   resetError: state => {
  //     state.error = null;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { newUser, accessToken } = payload;
        state.loading = false;
        state.user = newUser;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload;
        state.loading = false;
        state.user = user;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(update.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        state.loading = false;
        state.user = payload;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(update.rejected, (state, { payload }) => {
        state.loading = false;
        state.token = '';
        state.error = payload;
      })
      .addCase(updateAvatar.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        const { avatarURL } = payload;
        state.loading = false;
        state.user = { ...state.user, avatarURL };
        state.isLogin = true;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.loading = false;
        state.token = '';
        state.error = payload;
      })
      .addCase(googleAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload;
        state.loading = false;
        state.user = user;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(googleAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(current.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(current.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload;
        state.loading = false;
        state.user = user;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(current.rejected, (state, { payload }) => {
        state.loading = false;
        state.token = '';
        state.error = payload;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = {};
        state.token = '';
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(usersOrdersHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(usersOrdersHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ordersHistory = [...payload];
      })
      .addCase(usersOrdersHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resetToken = payload.resetToken;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
// export const { resetError } = userSlice.actions;

export default userSlice.reducer;
