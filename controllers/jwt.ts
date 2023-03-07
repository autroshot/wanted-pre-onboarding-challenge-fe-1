import { NextApiRequest, NextApiResponse } from 'next';
import { Controller } from './types';
import { createError } from './utils';

export const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  controller: Controller
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).send(createError(TOKEN_VALIDATION_ERROR));
  }
  return await controller(req, res);
};

export const TOKEN_VALIDATION_ERROR = '토큰이 존재하지 않습니다.';
