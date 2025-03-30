import { Router } from 'express';
import { RouteConfig } from '../types';
import {
  getCompletedGigsForPayment,
  processPaymentForGig,
} from '../services/gigs-service/gigsService';
import { contractAiError } from '../error/contractAiError';

const paymanRouter = Router();

async function getCompletedGigsHandler(): Promise<any> {
  const gigs = await getCompletedGigsForPayment();
  return { gigs };
}

async function sendGigPaymentHandler(req: any): Promise<any> {
  const { assignmentId, payeeId, amount, gigTitle } = req;

  if (!assignmentId || !payeeId || !amount) {
    throw new contractAiError('Assignment ID, payee ID, and amount are required');
  }

  const payment = await processPaymentForGig(assignmentId, payeeId, parseFloat(amount), gigTitle);

  return {
    success: true,
    payment,
  };
}

export const paymanRouterConfig: RouteConfig = {
  router: paymanRouter,
  endpoints: {
    '/getCompletedGigs': {
      handler: getCompletedGigsHandler,
      isUserScoped: false,
    },
    '/sendGigPayment': {
      handler: sendGigPaymentHandler,
      isUserScoped: false,
    },
  },
};
