import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../apis/todo';

const TODOS_QUERY_KEY = ['todos'];

export function useTodos(loginToken: string) {
  return useQuery(TODOS_QUERY_KEY, () => getTodos(loginToken));
}
