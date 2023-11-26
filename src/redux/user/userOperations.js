import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/api/brovko/user';

export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.register(data);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  }
);

export const update = createAsyncThunk(
  'user/update',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.update(data);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/avatars',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.updateAvatar(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

export const current = createAsyncThunk(
  'user/current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      const data = await api.current(user.token);
      return data;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState();
      if (!user.token) {
        return false;
      }
    },
  }
);

export const googleAuth = createAsyncThunk(
  'user/google',
  async (token, { rejectWithValue }) => {
    try {
      const result = await api.current(token);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.logout();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgot-password',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.forgotPassword(data);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  }
);

export const usersOrdersHistory = createAsyncThunk(
  'user/orders-history',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getAllOrdersAuth();
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  }
);
