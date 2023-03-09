import { Todo } from 'types/todo';

export type TodoSortBy = Extract<
  'title' | 'createdAt' | 'updatedAt',
  keyof Todo
>;
export type TodoSortOrder = 'ascending' | 'descending';
