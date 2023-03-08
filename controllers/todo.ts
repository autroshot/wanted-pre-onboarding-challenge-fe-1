import { TODO_VALIDATION_ERRORS } from 'utils/validators';
import {
  deleteTodo as deleteDBTodo,
  insertTodo,
  selectAllTodos,
  updateTodo as updateDBTodo,
} from '../db/todo';
import type { TodoInput } from '../types/todo';
import { Controller } from './types';
import { createError, createResponse, validateTokenDecorator } from './utils';

let createTodo: Controller = async (req, res) => {
  const todoInput: TodoInput = req.body;

  const newTodo = await insertTodo(todoInput);

  return res.status(200).json(createResponse(newTodo));
};

let getTodos: Controller = async (req, res) => {
  const todos = await selectAllTodos();

  if (!todos) {
    return res
      .status(400)
      .json(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  return res.status(200).json(createResponse(todos));
};

let updateTodo: Controller = async (req, res) => {
  const id = String(req.query.id);
  const { title, content } = req.body;

  const { isSuccess, updatedTodo } = await updateDBTodo({
    id,
    title,
    content,
  });

  if (!isSuccess) {
    return res
      .status(400)
      .json(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  return res.status(200).json(createResponse(updatedTodo));
};

let deleteTodo: Controller = async (req, res) => {
  const id = String(req.query.id);

  const { isSuccess } = await deleteDBTodo(id);

  if (!isSuccess) {
    return res
      .status(400)
      .json(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  return res.status(200).json(createResponse(null));
};

createTodo = validateTokenDecorator(createTodo);
getTodos = validateTokenDecorator(getTodos);
updateTodo = validateTokenDecorator(updateTodo);
deleteTodo = validateTokenDecorator(deleteTodo);

export { createTodo, getTodos, updateTodo, deleteTodo };
