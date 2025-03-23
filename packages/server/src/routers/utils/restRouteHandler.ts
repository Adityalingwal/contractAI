import { Request, Response, NextFunction } from 'express';
import { AuthedRequest, RestEndpointConfig, TypedRequestBody } from '../../types';

export const restRouteHandler = (restEndpintConfig: RestEndpointConfig) => [
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      const response = await restEndpintConfig.handler(body, (req as AuthedRequest).user);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
];
