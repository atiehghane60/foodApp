import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  params: {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (resp: AxiosResponse) => ({
    ...(resp.data as any),
  }),
  async (err) => {
    if (err.response?.status === 504) {
      alert('error 504');
    }
    if (err.response?.status === 500) {
      alert('error 500');
    }
    if (err.response?.status === 403) {
      alert('error 403');
    }
    if (err.response?.status === 401) {
      alert('error 401');
    } else {
      return null;
    }
    return Promise.reject(err);
  }
);

export default instance;
