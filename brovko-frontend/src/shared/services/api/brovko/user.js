import instance from './instance';

const setToken = token => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refreshToken');
      if (refresh) {
        try {
          const { data } = await instance.post('/user/refresh', {
            refreshToken: refresh,
          });
          const { accessToken, refreshToken } = data;
          if (accessToken) {
            localStorage.setItem('refreshToken', refreshToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return instance(originalRequest);
          } else {
            // Оновлення токену не вдалося
            return Promise.reject(new Error('Token refresh failed'));
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const register = async data => {
  const { data: result } = await instance.post('/user/register', data);
  setToken(result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  return result;
};

export const login = async data => {
  const { data: result } = await instance.post('/user/login', data);
  setToken(result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);

  return result;
};

export const current = async token => {
  try {
    setToken(token);
    const { data } = await instance.get('/user/current');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const logout = async () => {
  const { data } = await instance.post('/user/logout');
  setToken();
  return data;
};

export const update = async updatedData => {
  try {
    const { data: result } = await instance.patch(`/user/update`, updatedData);
    setToken(result.accessToken);
    return result;
  } catch (error) {
    console.log('error in api.update :', error);
    throw new Error(error);
  }
};

export const updateAvatar = async updatedData => {
  const { data: result } = await instance.patch(`/user/avatars`, updatedData);
  setToken(result.accessToken);
  return result;
};

export const forgotPassword = async data => {
  const { data: result } = await instance.post('/user/forgot-password', data);

  return result;
};

export const resetPasswordRequest = async token => {
  const { data: result } = await instance.get(`user/reset-password/${token}`);
  return result;
};

export const resetPassword = async (token, password) => {
  const { data: result } = await instance.post(
    `user/reset-password/${token}`,
    password
  );

  return result;
};

export const getAllOrdersAuth = async () => {
  const { data } = await instance.get('/orders/auth');
  // console.log(data);
  return data;
};

export const getAvatar = async () => {
  try {
    const { data } = await instance.get('/user/avatars');
    // console.log('data.avatarURL', data.avatarURL);
    return data.avatarURL;
  } catch (error) {
    console.error('Error getting user avatar:', error);
    throw error;
  }
};

export const getUserByEmail = async (email = '') => {
  try {
    const { data } = await instance.get('/user/get-user', {
      params: {
        email,
      },
    });
    return data;
  } catch (error) {
    console.log('Error getting user by email: ', error);
    throw error;
  }
};

export const changeUserStatus = async data => {
  try {
    const { data: result } = await instance.patch('/user/update-status', data);
    return result;
  } catch (error) {
    console.error('Error changing user status: ', error);
    throw error;
  }
};

export const getAllByStatus = async (status = '') => {
  try {
    const { data } = await instance.get('/user/get-by-status', {
      params: {
        status,
      },
    });
    return data;
  } catch (error) {
    console.error('Error getting users by status: ', error);
    throw error;
  }
};
