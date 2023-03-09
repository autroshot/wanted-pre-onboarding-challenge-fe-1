import { Todo } from '../../types/todo';

export interface DBTodo {
  [index: string]: string;
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type UpdateResult = UpdateSuccessResult | UpdateFailureResult;

interface UpdateSuccessResult {
  updatedTodo: Todo;
  isSuccess: true;
}
interface UpdateFailureResult {
  updatedTodo: undefined;
  isSuccess: false;
}

export interface DeleteResult {
  isSuccess: boolean;
}
