import { TodoDB } from 'db/types';
import { nanoid } from 'nanoid';
import { Todo, TodoInput } from '../../types/todo';
import { getSheet } from '../utils';
import { TodoRow } from './types';

export async function createDBTodo(todoInput: TodoInput): Promise<TodoDB> {
  return {
    ...todoInput,
    id: nanoid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
export async function addTodo(DBTodo: TodoDB): Promise<void> {
  const todoSheet = await getSheet('todo');

  await todoSheet.addRow(DBTodo);
}
export async function addTodos(DBTodos: TodoDB[]): Promise<void> {
  const todoSheet = await getSheet('todo');

  await todoSheet.addRows(DBTodos);
}
export async function getTodoRow(id: Todo['id']): Promise<TodoRow | null> {
  const todoSheet = await getSheet('todo');
  const todoRows = (await todoSheet.getRows()) as TodoRow[];

  return todoRows.find((todoRow) => todoRow.id === id) || null;
}
export async function getTodoRows(): Promise<TodoRow[]> {
  const todoSheet = await getSheet('todo');
  const todoRows = (await todoSheet.getRows()) as TodoRow[];

  return todoRows;
}
export function getTodos(todoRows: TodoRow[]): Todo[] {
  return todoRows.map(toTodo);
}
function toDBTodo(todo: Todo): TodoDB {
  return {
    id: todo.id,
    title: todo.title,
    content: todo.content,
    created_at: todo.createdAt,
    updated_at: todo.updatedAt,
  };
}
export function toDBTodos(todos: Todo[]): TodoDB[] {
  return todos.map(toDBTodo);
}
export function toTodo(todoRow: TodoRow | TodoDB): Todo {
  return {
    id: todoRow.id,
    title: todoRow.title,
    content: todoRow.content,
    createdAt: todoRow.created_at,
    updatedAt: todoRow.updated_at,
  };
}
