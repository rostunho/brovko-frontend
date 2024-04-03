import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BROVKO_API,
});

export default instance;
