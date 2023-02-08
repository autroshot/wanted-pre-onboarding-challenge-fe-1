import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TodoType } from '../pages/todos/[id]';
import { getLoginToken } from '../utils/auth';

export function getTodos(storage: Storage) {
  const axiosInstance = createAxiosInstance();

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
  const axiosInstance = createAxiosInstance();

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

export function updateTodo(storage: Storage, todoToUpdate: TodoToUpdate) {
  const axiosInstance = createAxiosInstance();

  return axiosInstance.put<
    PutResponseData,
    AxiosResponse<PutResponseData>,
    PutRequestData
  >(
    `/todos/${todoToUpdate.id}`,
    { title: todoToUpdate.title, content: todoToUpdate.content },
    createAxiosRequestConfigHeadersWithAuth(storage)
  );

  type PutRequestData = Pick<TodoType, 'title' | 'content'>;
  interface PutResponseData {
    data: TodoType;
  }
}

export function deleteTodo(storage: Storage, todoId: string) {
  const axiosInstance = createAxiosInstance();

  return axiosInstance.delete<null, AxiosResponse<null>, null>(
    `/todos/${todoId}`,
    createAxiosRequestConfigHeadersWithAuth(storage)
  );
}

function createAxiosInstance() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });
}

function createAxiosRequestConfigHeadersWithAuth(
  storage: Storage
): AxiosRequestConfig {
  return {
    headers: { authorization: getLoginToken(storage) },
  };
}

interface TodoToUpdate {
  id: string;
  title: string;
  content: string;
}
