import { isAxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Controller } from '../controllers/types';

export function handler(controllerByMethod: ControllerByMethod) {
  const { POSTController, GETController, PUTController, DELETEController } =
    controllerByMethod;

  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
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
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 429) {
        res.status(429).json({
          message: '너무 많은 요청이 발생했습니다. 1분 후에 다시 시도해주세요.',
        });

        return;
      }

      console.error(err);
      res.status(500).json({ message: '서버에 오류가 발생했습니다.' });
    }
  };
}

interface ControllerByMethod {
  POSTController?: Controller;
  GETController?: Controller;
  PUTController?: Controller;
  DELETEController?: Controller;
}
