import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TodoType } from '../components/todo/container';

export async function getTodos(loginToken: string) {
  const axiosInstance = createAxiosInstance();

  axiosInstance.interceptors.response.use((res) => {
    (res.data as GetResponseData).data.reverse();

    return res;
  });

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

export async function updateTodo(
  loginToken: string,
  todoToUpdate: TodoToUpdate
) {
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

export interface TodoToUpdate {
  id: string;
  title: string;
  content: string;
}
