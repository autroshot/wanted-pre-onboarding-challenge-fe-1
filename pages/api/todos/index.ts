import { validateToken } from 'controllers/jwt';
import { createTodo, getTodos } from 'controllers/todo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        await validateToken(req, res, getTodos);
        break;

      case 'POST':
        await validateToken(req, res, createTodo);
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
