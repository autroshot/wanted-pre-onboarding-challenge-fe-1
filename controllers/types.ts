import { NextApiRequest, NextApiResponse } from 'next';

export type Controller = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<NextApiResponse | void> | NextApiResponse | void;
