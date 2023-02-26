import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../../fetchers/todo';
import { ErrorResponseData } from '../../types/response';
import { TodoToUpdate, TodoType } from '../../types/todo';

const TODOS_QUERY_KEY = ['todos'];

export function useTodos(
  loginToken: string,
  onError?: UseQueryOptions<
    TodoType[],
    AxiosError<ErrorResponseData>,
    TodoType[],
    string[]
  >['onError']
) {
  return useQuery<
    TodoType[],
    AxiosError<ErrorResponseData>,
    TodoType[],
    string[]
  >({
    queryKey: TODOS_QUERY_KEY,
    queryFn: () => getTodos(loginToken),
    onError,
  });
}

export function useTodoCreation(loginToken: string) {
  const queryClient = useQueryClient();

  return useMutation<TodoType, AxiosError<ErrorResponseData>, void>({
    mutationFn: () => createTodo(loginToken),
    onSuccess: (newTodo) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) return [newTodo, ...oldTodos];
      });
    },
  });
}

export function useTodoUpdation(loginToken: string) {
  const queryClient = useQueryClient();

  return useMutation<TodoType, AxiosError<ErrorResponseData>, TodoToUpdate>({
    mutationFn: (todoToUpdate: TodoToUpdate) =>
      updateTodo(loginToken, todoToUpdate),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) {
          return oldTodos.map((todo) => {
            if (todo.id === updatedTodo.id) return updatedTodo;
            return todo;
          });
        }
      });
    },
  });
}

export function useTodoDeletion(loginToken: string) {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ErrorResponseData>, string>({
    mutationFn: (todoId: TodoType['id']) => deleteTodo(loginToken, todoId),
    onSuccess: (data, todoId) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) {
          return oldTodos.filter((todo) => todo.id !== todoId);
        }
      });
    },
  });
}
