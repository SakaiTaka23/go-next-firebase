import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
