import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/api/brovko/user';

console.log('api :>> ', api);

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
    console.log('data in thunk :>> ', data);

    try {
      const result = await api.update(data);

      console.log('result in thunk :>> ', result);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
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
    console.log('token', token);
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
