import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  getTodos,
  TodoId,
  TodoToUpdate,
  updateTodo,
} from '../apis/todo';
import { TodoType } from '../types/todo';

const TODOS_QUERY_KEY = ['todos'];

export function useTodos(loginToken: string) {
  return useQuery(TODOS_QUERY_KEY, () => getTodos(loginToken));
}

export function useTodoCreation(loginToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
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

  return useMutation({
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

  return useMutation({
    mutationFn: (todoId: TodoId) => deleteTodo(loginToken, todoId),
    onSuccess: (data, todoId) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) {
          return oldTodos.filter((todo) => todo.id !== todoId);
        }
      });
    },
  });
}
