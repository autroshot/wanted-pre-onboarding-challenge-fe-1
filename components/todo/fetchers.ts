import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Todo, TodoInput } from 'types/todo';
import { createAxiosInstance } from 'utils/axios';

export async function getTodos(loginToken: string) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.get<GetResponseData>('/todos', {
    headers: { authorization: loginToken },
  });

  return res.data.data;

  interface GetResponseData {
    data: Todo[];
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

  type PostRequestData = Pick<Todo, 'title' | 'content'>;
  interface PostResponseData {
    data: Todo;
  }
}

export async function updateTodo(
  loginToken: string,
  id: Todo['id'],
  todoInput: TodoInput
) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.put<
    PutResponseData,
    AxiosResponse<PutResponseData>,
    PutRequestData
  >(`/todos/${id}`, todoInput, createAxiosRequestConfigWithAuth(loginToken));

  return res.data.data;

  type PutRequestData = Pick<Todo, 'title' | 'content'>;
  interface PutResponseData {
    data: Todo;
  }
}

export async function deleteTodo(loginToken: string, todoId: Todo['id']) {
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

function createAxiosRequestConfigWithAuth(
  loginToken: string
): AxiosRequestConfig {
  return {
    headers: { authorization: loginToken },
  };
}
