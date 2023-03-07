import { Controller } from './types';
import { createError } from './utils';

export const validateTokenDecorator = (controller: Controller) => {
  const wrappedController: Controller = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send(createError(TOKEN_VALIDATION_ERROR));
    }
    return controller(req, res);
  };

  return wrappedController;
};

export const TOKEN_VALIDATION_ERROR = '토큰이 존재하지 않습니다.';
