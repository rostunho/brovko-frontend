import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/services/api/brovko/user';

export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.register(data);
      return result;
    } catch ({ response }) {
      if (response.status === 409) {
        return rejectWithValue(
          'Користувач з такими даними вже зареєстрований!'
        );
      } else {
        return rejectWithValue(
          'Під час реєстрації виникла помилка. Спробуйте ще!'
        );
      }
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      console.log('result', result);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      if (response) {
        const { status, data: responseData } = response;

        if (status === 403) {
          return rejectWithValue('Невірний e-mail або пароль!');
        } else if (status === 404) {
          return rejectWithValue(
            'Користувача не знайдено! Зареєструйтеся, будь ласка!'
          );
        } else if (status === 400) {
          return rejectWithValue(
            responseData.message ||
              'Некорректний запит! Перевірте введену інформацію.'
          );
        } else {
          return rejectWithValue('Внутрішня помилка. Спробуйте пізніше!');
        }
      } else {
        return rejectWithValue(
          'Під час входу виникла помилка. Спробуйте пізніше!'
        );
      }
    }
  }
);

export const update = createAsyncThunk(
  'user/update',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.update(data);
      return result;
    } catch (response) {
      console.log('response into update catch', response);
      return rejectWithValue(response);
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
  'user/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.forgotPassword(data);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      if (response) {
        const { status, data: responseData } = response;

        if (status === 404) {
          return rejectWithValue(
            'Користувача не знайдено! Зареєструйтеся, будь ласка!'
          );
        } else if (status === 400) {
          return rejectWithValue(
            responseData.message ||
              'Некорректний запит! Перевірте введену інформацію.'
          );
        } else {
          return rejectWithValue('Внутрішня помилка. Спробуйте пізніше!');
        }
      } else {
        return rejectWithValue(
          'Під час входу виникла помилка. Спробуйте пізніше!'
        );
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const result = await api.resetPassword(token, password);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      if (response) {
        const { status } = response;

        if (status === 401) {
          return rejectWithValue(
            'Посилання на зміну паролю недійсне або прострочено!'
          );
        }
      } else {
        return rejectWithValue('Щось пішло не так... Спробуйте пізніше!');
      }
    }
  }
);

export const usersOrdersHistory = createAsyncThunk(
  'user/orders-history',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getAllOrdersAuth();
      // console.log('result', result);
      return result;
    } catch ({ response }) {
      // console.log(response.data.message);
      return rejectWithValue(response.data.message);
    }
  }
);
