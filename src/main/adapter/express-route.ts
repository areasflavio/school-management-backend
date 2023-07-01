import { type Controller } from '@core/application/controller';
import { HttpRequest } from '@core/helpers/http';
import { type Request, type Response } from 'express';

export const expressAdapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      accessToken: req.accessToken,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
