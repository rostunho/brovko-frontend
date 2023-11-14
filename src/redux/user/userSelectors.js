import { createSelector } from '@reduxjs/toolkit';
export const selectIsLogin = ({ user }) => user.isLogin;
export const selectIsLoadingUser = ({ user }) => user.loading;
export const selectUser = ({ user }) => user.user;
export const errorUser = ({ user }) => user.error;
export const ordersUserHistory = ({ user }) => user.ordersHistory;

const selectLoginAndToken = state => {
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
