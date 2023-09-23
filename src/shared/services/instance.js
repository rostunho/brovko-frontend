import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BROVKO_API,
  // baseURL: 'http://localhost:4999/api',
});

export default instance;
