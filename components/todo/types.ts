export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type TodoInput = Pick<Todo, 'title' | 'content'>;

export type TodoSortBy = Extract<
  'title' | 'createdAt' | 'updatedAt',
  keyof Todo
>;
export type TodoSortOrder = 'ascending' | 'descending';
