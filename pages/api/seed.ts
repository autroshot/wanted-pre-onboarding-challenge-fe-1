import { TodoSeed, UserSeed } from 'db/seeds';
import { deleteAllTodos, insertSeedTodos } from 'db/todo';
import { deleteAllUsers, insertUsers } from 'db/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const dummyUserInputs = new UserSeed().getUserInputs();
        const dummyTodos = new TodoSeed().getTodosWithGeneratedId();

        await deleteAllUsers();
        await insertUsers(dummyUserInputs);

        await deleteAllTodos();
        await insertSeedTodos(dummyTodos);

        res.status(200).end();
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
}
