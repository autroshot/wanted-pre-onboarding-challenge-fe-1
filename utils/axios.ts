import axios from 'axios';

export function createAxiosInstance() {
  return axios.create({
    baseURL: '/api',
  });
}
