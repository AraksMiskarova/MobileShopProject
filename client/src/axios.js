import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mobileshop-api.onrender.com/',
});

instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = window.localStorage.getItem('token');
    return modifiedConfig;
  }
  return config;
});

export default instance;
