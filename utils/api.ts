import { NextApiRequest, NextApiResponse } from 'next';
import { Controller } from '../controllers/types';

export async function controllerSwitch(
  req: NextApiRequest,
  res: NextApiResponse,
  controllerByMethod: ControllerByMethod
): Promise<void> {
  const { POSTController, GETController, PUTController, DELETEController } =
    controllerByMethod;

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
