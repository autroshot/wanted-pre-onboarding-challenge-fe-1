import { validateToken } from 'controllers/jwt';
import { deleteTodo, updateTodo } from 'controllers/todo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'PUT':
        await validateToken(req, res, updateTodo);
        break;

      case 'DELETE':
        await validateToken(req, res, deleteTodo);
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
