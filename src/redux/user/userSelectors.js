import { createSelector } from '@reduxjs/toolkit';

export const selectIsLogin = ({ user }) => user.isLogin;

export const selectIsLoadingUser = ({ user }) => user.loading;

export const selectUser = ({ user }) => user;

export const selectUserStatus = ({ user }) => user.user.status;

export const errorAuth = ({ user }) => user.error;

export const ordersUserHistory = ({ user }) => user.ordersHistory;

export const productInBasket = ({ user }) => user.productInBasket;

export const selectRequestSuccess = ({ user }) => user.resetToken;

export const selectIsPswReset = ({ user }) => user.isPasswordReset;

export const selectLoginAndToken = state => {
  return {
    isLogin: state.user.isLogin,
    token: state.user.token,
  };
};

const memoizedSelectLoginAndToken = createSelector(
  [selectLoginAndToken],
  loginAndToken => loginAndToken
);

export { memoizedSelectLoginAndToken };
