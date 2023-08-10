import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://brovko-backend.onrender.com/api',
});

export default instance;
