import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TodoType } from '../pages/todos/[id]';
import { getLoginToken } from '../utils/auth';

export function getTodos(storage: Storage) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });
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

export function createTodo(storage: Storage) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return axiosInstance.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >(
    '/todos',
    { title: '', content: '' },
    createAxiosRequestConfigHeadersWithAuth(storage)
  );

  type PostRequestData = Pick<TodoType, 'title' | 'content'>;
  interface PostResponseData {
    data: TodoType;
  }
}

function createAxiosRequestConfigHeadersWithAuth(
  storage: Storage
): AxiosRequestConfig {
  return {
    headers: { authorization: getLoginToken(storage) },
  };
}
