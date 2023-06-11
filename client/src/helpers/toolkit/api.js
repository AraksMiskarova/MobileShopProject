import instance from '../../api/axiosService';

function request(method, url, data) {
  console.log(method, 'logger ---', url);

  return instance({
    url: `${url}`,
    responseType: 'json',
    method,
    data,
  });
}
const api = {
  get: url => request('get', url),
};

export default api;
