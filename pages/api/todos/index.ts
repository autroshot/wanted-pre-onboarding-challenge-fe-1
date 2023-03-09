import { createTodo, getTodos } from 'controllers/todo';
import { NextApiRequest, NextApiResponse } from 'next';
import { controllerSwitch } from 'utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, {
    POSTController: createTodo,
    GETController: getTodos,
  });
}
