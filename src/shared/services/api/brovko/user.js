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
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data: result } = await instance.post('/user/refresh', {
          refreshToken,
        });
        setToken(result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        return instance(error.config);
      } catch (error) {
        return Promise.reject(error);
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
  const { data: result } = await instance.patch(`/user/update`, updatedData);
  setToken(result.accessToken);
  return result;
};

export const forgotPassword = async data => {
  const { data: result } = await instance.post('/user/forgot-password', data);
  return result;
};

export const getAllOrdersAuth = async () => {
  const { data } = await instance.get('/orders/auth');
  console.log(data);
  return data;
};
