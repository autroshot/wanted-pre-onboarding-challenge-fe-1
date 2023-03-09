import { seed } from 'controllers/seed';
import { NextApiRequest, NextApiResponse } from 'next';
import { controllerSwitch } from 'utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, { GETController: seed });
}
