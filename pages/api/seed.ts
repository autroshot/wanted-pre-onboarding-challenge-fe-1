import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
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
