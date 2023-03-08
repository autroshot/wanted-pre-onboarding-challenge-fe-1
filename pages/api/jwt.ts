import { login } from 'controllers/auth';
import { controllerSwitch } from 'controllers/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await controllerSwitch(req, res, { POSTController: login });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
}
