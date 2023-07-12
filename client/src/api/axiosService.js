import axios from 'axios';
import TokenService from './tokenService';

let responsePromise;

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const token = TokenService.getLocalAccessToken();
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      try {
        if (!responsePromise) {
          responsePromise = axios.post('api/customers/refresh-token', {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
        }

        const response = await responsePromise;
        const { token, refreshToken } = response.data;
        TokenService.updateLocalAccessToken(token);
        TokenService.updateLocalRefreshToken(refreshToken);

        responsePromise = undefined;
        return instance(originalConfig);
      } catch (_error) {
        console.log('_error', _error);
        // Logout User
        TokenService.removeLocalRefreshToken();
        TokenService.removeLocalAccessToken();
        window.location.href = '/login';
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
