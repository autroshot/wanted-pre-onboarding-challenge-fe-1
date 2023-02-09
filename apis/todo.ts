import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TodoType } from '../pages/todos/[id]';

export function getTodos(loginToken: string) {
  const axiosInstance = createAxiosInstance();

  axiosInstance.interceptors.response.use((res) => {
    (res.data as GetResponseData).data.reverse();

    return res;
  });

  return axiosInstance.get<GetResponseData>('/todos', {
    headers: { authorization: loginToken },
  });

  interface GetResponseData {
    data: TodoType[];
  }
}

export function createTodo(loginToken: string) {
  const axiosInstance = createAxiosInstance();

  return axiosInstance.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >(
    '/todos',
    { title: '', content: '' },
    createAxiosRequestConfigWithAuth(loginToken)
  );

  type PostRequestData = Pick<TodoType, 'title' | 'content'>;
  interface PostResponseData {
    data: TodoType;
  }
}

export function updateTodo(loginToken: string, todoToUpdate: TodoToUpdate) {
  const axiosInstance = createAxiosInstance();

  return axiosInstance.put<
    PutResponseData,
    AxiosResponse<PutResponseData>,
    PutRequestData
  >(
    `/todos/${todoToUpdate.id}`,
    { title: todoToUpdate.title, content: todoToUpdate.content },
    createAxiosRequestConfigWithAuth(loginToken)
  );

  type PutRequestData = Pick<TodoType, 'title' | 'content'>;
  interface PutResponseData {
    data: TodoType;
  }
}

export function deleteTodo(loginToken: string, todoId: string) {
  const axiosInstance = createAxiosInstance();

  return axiosInstance.delete<null, AxiosResponse<null>, null>(
    `/todos/${todoId}`,
    createAxiosRequestConfigWithAuth(loginToken)
  );
}

function createAxiosInstance() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });
}

function createAxiosRequestConfigWithAuth(
  loginToken: string
): AxiosRequestConfig {
  return {
    headers: { authorization: loginToken },
  };
}

interface TodoToUpdate {
  id: string;
  title: string;
  content: string;
}
