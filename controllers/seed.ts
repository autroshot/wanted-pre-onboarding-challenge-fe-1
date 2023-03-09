import { TodoSeed, UserSeed } from 'db/seeds';
import { deleteAllTodos, insertSeedTodos } from 'db/todo';
import { deleteAllUsers, insertUsers } from 'db/user';
import { Controller } from './types';

export const seed: Controller = async (req, res) => {
  const dummyUserInputs = new UserSeed().getUserInputs();
  const dummyTodos = new TodoSeed().getTodosWithGeneratedId();

  await deleteAllUsers();
  await insertUsers(dummyUserInputs);

  await deleteAllTodos();
  await insertSeedTodos(dummyTodos);

  return res.status(200).end();
};
