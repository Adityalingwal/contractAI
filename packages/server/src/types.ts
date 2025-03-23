import { Request, Router, Locals } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface RestEndpointConfig {
  handler: (body: any, user: any) => Promise<any>;
  isUserScoped: boolean;
  isAdminScoped?: boolean;
  noAuth?: boolean;
  method?: 'get' | 'post';
}

export interface RouteConfig {
  router: Router;
  endpoints: {
    [index: string]: RestEndpointConfig;
  };
}

export type AuthedRequest = Request & { user: User };
