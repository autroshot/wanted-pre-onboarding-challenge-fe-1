import { signUp } from 'controllers/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { controllerSwitch } from 'utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await controllerSwitch(req, res, { POSTController: signUp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버에서 오류가 발생했습니다.' });
  }
}
