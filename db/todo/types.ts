import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { Todo } from '../../types/todo';

export interface DBTodo {
  [index: string]: string;
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export class TodoRow extends GoogleSpreadsheetRow implements DBTodo {
  constructor(
    parentSheet: GoogleSpreadsheetWorksheet,
    rowNumber: number,
    data: any
  ) {
    super(parentSheet, rowNumber, data);

    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

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
