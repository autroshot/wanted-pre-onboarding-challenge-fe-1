import { deleteTodo, updateTodo } from 'controllers/todo';
import { NextApiRequest, NextApiResponse } from 'next';
import { controllerSwitch } from 'utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, {
    PUTController: updateTodo,
    DELETEController: deleteTodo,
  });
}
