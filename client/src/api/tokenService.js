const getLocalRefreshToken = () => {
  const refreshToken = JSON.parse(localStorage.getItem('refresh_token'));
  return refreshToken;
};

const getLocalAccessToken = () => {
  const accessToken = JSON.parse(localStorage.getItem('token'));
  return accessToken;
};

const updateLocalAccessToken = newToken => {
  localStorage.setItem('token', JSON.stringify(newToken));
};

const updateLocalRefreshToken = newToken => {
  localStorage.setItem('refresh_token', JSON.stringify(newToken));
};

const removeLocalAccessToken = () => {
  localStorage.removeItem('token');
};

const removeLocalRefreshToken = () => {
  localStorage.removeItem('refresh_token');
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  removeLocalAccessToken,
  removeLocalRefreshToken,
};

export default TokenService;
