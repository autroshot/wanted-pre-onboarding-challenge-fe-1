import JWT from 'jsonwebtoken';
import { TOKEN_VALIDATION_ERROR } from './contants';
import { Controller } from './types';

export function createResponse<T>(data: T) {
  return {
    data,
  };
}

export function createError<T>(details: T) {
  return {
    details,
  };
}

export function createToken(value: string): string {
  const JWTSecretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY;

  if (!JWTSecretKey) throw new Error('환경 변수에 JWT 키가 존재하지 않습니다.');

  return JWT.sign(value, JWTSecretKey);
}

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
