import axios, { AxiosRequestConfig } from 'axios';
import { TodoType } from '../pages/todos/[id]';
import { getLoginToken } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export function getTodos(storage: Storage) {
  axiosInstance.interceptors.response.use((res) => {
    (res.data as GetResponseData).data.reverse();

    return res;
  });

  return axiosInstance.get<GetResponseData>(
    '/todos',
    createAxiosRequestConfigHeadersWithAuth(storage)
  );

  interface GetResponseData {
    data: TodoType[];
  }
}

function createAxiosRequestConfigHeadersWithAuth(
  storage: Storage
): AxiosRequestConfig {
  return {
    headers: { authorization: getLoginToken(storage) },
  };
}
