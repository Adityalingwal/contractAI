import { Request, Response, NextFunction } from 'express';
import { AuthedRequest, RestEndpointConfig, TypedRequestBody } from '../../types';
import { jwtMiddleware } from '../sso-router/ssoRouter';
import { permissionMiddleware } from './permissionHandler';
import { adminMiddleware } from '../admin-router/adminRouter';

export const restRouteHandler = (restEndpintConfig: RestEndpointConfig) => [
  (req: Request, res: Response, next: NextFunction) => {
    if (!restEndpintConfig.noAuth) {
      jwtMiddleware(req as AuthedRequest, res, next);
    } else {
      next();
    }
  },
  (req: Request, res: Response, next: NextFunction) => {
    if (restEndpintConfig.isUserScoped) {
      permissionMiddleware(req as AuthedRequest, res, next);
    } else {
      next();
    }
  },
  (req: Request, res: Response, next: NextFunction) => {
    if (restEndpintConfig.isAdminScoped) {
      adminMiddleware(req as AuthedRequest, res, next);
    } else {
      next();
    }
  },
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
