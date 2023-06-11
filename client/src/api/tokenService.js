const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

const getLocalAccessToken = () => {
  const accessToken = localStorage.getItem('token');
  return accessToken;
};

const updateLocalAccessToken = newToken => {
  localStorage.setItem('token', newToken);
};

const updateLocalRefreshToken = newToken => {
  localStorage.setItem('refreshToken', newToken);
};

const removeLocalAccessToken = () => {
  localStorage.removeItem('token');
};

const removeLocalRefreshToken = () => {
  localStorage.removeItem('refreshToken');
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
