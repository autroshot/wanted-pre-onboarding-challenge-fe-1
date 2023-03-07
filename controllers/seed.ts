import { TodoSeed, UserSeed } from 'db/seeds';
import { deleteAllTodos, insertSeedTodos } from 'db/todo';
import { deleteAllUsers, insertUsers } from 'db/user';
import { NextApiRequest, NextApiResponse } from 'next';

export async function seed(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const dummyUserInputs = new UserSeed().getUserInputs();
  const dummyTodos = new TodoSeed().getTodosWithGeneratedId();

  await deleteAllUsers();
  await insertUsers(dummyUserInputs);

  await deleteAllTodos();
  await insertSeedTodos(dummyTodos);

  res.status(200).end();
}
