import axios from '../../axios';

export const fetchData = async (url, method) => {
  try {
    const response = await axios[method](url, null);
    return response.data;
  } catch (error) {
    console.warn(error);
  }
};
