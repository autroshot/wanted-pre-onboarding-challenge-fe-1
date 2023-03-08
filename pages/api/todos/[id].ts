import { deleteTodo, updateTodo } from 'controllers/todo';
import { controllerSwitch } from 'controllers/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await controllerSwitch(req, res, {
      PUTController: updateTodo,
      DELETEController: deleteTodo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
}
