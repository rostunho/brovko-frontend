import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BROVKO_API,
  baseURL: 'http://localhost:5000/api',
});

export default instance;
