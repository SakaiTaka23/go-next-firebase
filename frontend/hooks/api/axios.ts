import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export { axiosInstance, fetcher };
