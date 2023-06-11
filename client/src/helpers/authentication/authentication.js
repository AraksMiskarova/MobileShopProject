export const isToken = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

export const isAuthenticated = () => {
  const customer = localStorage.getItem('customer');
  return customer !== null;
};
