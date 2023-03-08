import JWT from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponseData } from 'types/response';
import { TOKEN_VALIDATION_ERROR } from './contants';
import { Controller } from './types';

export function createResponse<T>(data: T) {
  return {
    data,
  };
}

export function createError(message: string): ErrorResponseData {
  return {
    message,
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
      return res.status(400).json(createError(TOKEN_VALIDATION_ERROR));
    }
    return controller(req, res);
  };

  return wrappedController;
};

export async function controllerSwitch(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    POSTController,
    GETController,
    PUTController,
    DELETEController,
  }: ControllerByMethod
): Promise<void> {
  switch (req.method) {
    case 'POST':
      if (!POSTController) {
        res.status(405).end();
        break;
      }
      await POSTController(req, res);
      break;

    case 'GET':
      if (!GETController) {
        res.status(405).end();
        break;
      }
      await GETController(req, res);
      break;

    case 'PUT':
      if (!PUTController) {
        res.status(405).end();
        break;
      }
      await PUTController(req, res);
      break;

    case 'DELETE':
      if (!DELETEController) {
        res.status(405).end();
        break;
      }
      await DELETEController(req, res);
      break;

    default:
      res.status(405).end();
      break;
  }
}

interface ControllerByMethod {
  POSTController?: Controller;
  GETController?: Controller;
  PUTController?: Controller;
  DELETEController?: Controller;
}
