import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TodoInputs, TodoType } from './types';

export async function getTodos(loginToken: string) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.get<GetResponseData>('/todos', {
    headers: { authorization: loginToken },
  });

  return res.data.data;

  interface GetResponseData {
    data: TodoType[];
  }
}

export async function createTodo(loginToken: string) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >(
    '/todos',
    { title: '', content: '' },
    createAxiosRequestConfigWithAuth(loginToken)
  );

  return res.data.data;

  type PostRequestData = Pick<TodoType, 'title' | 'content'>;
  interface PostResponseData {
    data: TodoType;
  }
}

export async function updateTodo(loginToken: string, todoToUpdate: TodoInputs) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.put<
    PutResponseData,
    AxiosResponse<PutResponseData>,
    PutRequestData
  >(
    `/todos/${todoToUpdate.id}`,
    { title: todoToUpdate.title, content: todoToUpdate.content },
    createAxiosRequestConfigWithAuth(loginToken)
  );

  return res.data.data;

  type PutRequestData = Pick<TodoType, 'title' | 'content'>;
  interface PutResponseData {
    data: TodoType;
  }
}

export async function deleteTodo(loginToken: string, todoId: TodoType['id']) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.delete<
    DeleteResponseData,
    AxiosResponse<DeleteResponseData>,
    null
  >(`/todos/${todoId}`, createAxiosRequestConfigWithAuth(loginToken));

  return res.data.data;

  interface DeleteResponseData {
    data: null;
  }
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
