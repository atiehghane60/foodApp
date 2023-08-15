import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Domain': 'mediana.test',
  },
});

instance.interceptors.response.use(
  (resp: AxiosResponse) => ({
    ...(resp.data as any),
    status: resp.status,
  }),
  async (err) => {
    if (err.response.status === 504) {
      alert('error 504');
    }
    if (err.response.status === 500) {
      alert('error 500');
    }
    if (err.response.status === 403) {
      alert('error 403');
    }
    if (err.response.status === 401) {
      alert('error 401');
    }
    return Promise.reject(err);
  }
);

export default instance;
