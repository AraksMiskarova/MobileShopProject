import instance from '../../api/axiosService';

export const fetchData = async (url, method) => {
  try {
    const response = await instance[method](url, null);
    return response.data;
  } catch (error) {
    console.warn(error);
  }
};
