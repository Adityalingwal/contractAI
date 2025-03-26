import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';

const paymanRouter = Router();

async function createPayeeHandler(): Promise<any> {}

async function sendPaymenthandler(): Promise<any> {}

export const contractorRouterConfig: RouteConfig = {
  router: paymanRouter,
  endpoints: {
    '/createPayee': {
      handler: createPayeeHandler,
      isUserScoped: false,
    },
    '/sendPayment': {
      handler: sendPaymenthandler,
      isUserScoped: false,
    },
  },
};
