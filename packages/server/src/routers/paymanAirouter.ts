import { Router } from 'express';
import { RouteConfig } from '../types';
import {
  getCompletedGigsForPayment,
  processPaymentForGig,
} from '../services/gigs-service/gigsService';
import { contractAiError } from '../error/contractAiError';
import { getContractorPayments } from '../services/payman-service/paymanService';

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

async function getContractorPaymentsHandler(req: any): Promise<any> {
  const { contractorId } = req;
  
  if (!contractorId) {
    throw new contractAiError('Contractor ID is required');
  }

  const payments = await getContractorPayments(contractorId);
  console.log('payment is ',payments)
  return { payments };
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
    '/getContractorPayments': {
      handler: getContractorPaymentsHandler,
      isUserScoped: false,
    }
  },
  }
