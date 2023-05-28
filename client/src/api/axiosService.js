import axios from 'axios';
import TokenService from './tokenService';

let responsePromise;

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const token = TokenService.getLocalAccessToken();

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
          responsePromise = axios.post('api/customer/refreshToken', {
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
        //Logout User
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
