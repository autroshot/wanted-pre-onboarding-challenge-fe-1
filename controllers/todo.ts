import { TODO_VALIDATION_ERRORS } from 'utils/validators';
import {
  deleteTodo as deleteDBTodo,
  insertTodo,
  selectAllTodos,
  updateTodo as updateDBTodo,
} from '../db/todo';
import type { TodoInput } from '../types/todo';
import { validateTokenDecorator } from './jwt';
import { Controller } from './types';
import { createError, createResponse } from './utils';

let createTodo: Controller = async (req, res) => {
  const todoInput: TodoInput = req.body;

  const newTodo = await insertTodo(todoInput);

  return res.status(200).send(createResponse(newTodo));
};

let getTodos: Controller = async (req, res) => {
  const todos = await selectAllTodos();

  if (!todos) {
    return res
      .status(400)
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  return res.status(200).send(createResponse(todos));
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
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  return res.status(200).send(createResponse(updatedTodo));
};

let deleteTodo: Controller = async (req, res) => {
  const id = String(req.query.id);

  const { isSuccess } = await deleteDBTodo(id);

  if (!isSuccess) {
    return res
      .status(400)
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  return res.status(200).send(createResponse(null));
};

createTodo = validateTokenDecorator(createTodo);
getTodos = validateTokenDecorator(getTodos);
updateTodo = validateTokenDecorator(updateTodo);
deleteTodo = validateTokenDecorator(deleteTodo);

export { createTodo, getTodos, updateTodo, deleteTodo };
