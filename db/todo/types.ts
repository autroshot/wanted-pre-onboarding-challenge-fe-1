import { MyRow, TodoDB } from 'db/types';
import { Todo } from '../../types/todo';

export type TodoRow = MyRow<TodoDB>;

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
