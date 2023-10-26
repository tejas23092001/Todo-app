import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const customError = new Error('Network response was not ok');
    customError.response = error.response;
    throw customError;
  }
);

export default axiosInstance;
