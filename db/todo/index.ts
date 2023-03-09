import { Todo, TodoInput } from '../../types/todo';
import { getSheet } from '../utiles';
import { DeleteResult, UpdateResult } from './types';
import {
  addTodo,
  addTodos,
  createDBTodo,
  getTodoRow,
  getTodoRows,
  getTodos,
  toDBTodos,
  toTodo,
} from './utils';

export async function insertTodo(todoInput: TodoInput): Promise<Todo> {
  const newDBTodo = await createDBTodo(todoInput);

  await addTodo(newDBTodo);

  return toTodo(newDBTodo);
}

export async function insertSeedTodos(todos: Todo[]): Promise<void> {
  const newDBTodos = toDBTodos(todos);

  await addTodos(newDBTodos);
}

export async function selectAllTodos(): Promise<Todo[]> {
  const todoRows = await getTodoRows();

  return getTodos(todoRows);
}

export async function updateTodo({
  id,
  title,
  content,
}: Pick<Todo, 'id' | 'title' | 'content'>): Promise<UpdateResult> {
  const foundTodoRow = await getTodoRow(id);

  if (!foundTodoRow) return { updatedTodo: undefined, isSuccess: false };

  foundTodoRow.title = title;
  foundTodoRow.content = content;
  foundTodoRow.updated_at = new Date().toISOString();

  await foundTodoRow.save();

  return { isSuccess: true, updatedTodo: toTodo(foundTodoRow) };
}

export async function deleteTodo(id: Todo['id']): Promise<DeleteResult> {
  const foundTodoRow = await getTodoRow(id);

  if (!foundTodoRow) return { isSuccess: false };

  await foundTodoRow.delete();

  return { isSuccess: true };
}
export async function deleteAllTodos() {
  const todoSheet = await getSheet('todo');

  await todoSheet.clearRows();
}
