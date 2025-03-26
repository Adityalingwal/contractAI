import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import { paymanService } from '../services/payman-service/paymanService';
import {
  CreatePayeeRequest,
  CreatePayeeResponse,
  SendPaymentRequest,
  SendPaymentResponse,
  GetPayeesRequest,
  GetPayeesResponse
} from '../api-types/apiTypes';

const paymanRouter = Router();

async function createPayeeHandler(req: CreatePayeeRequest): Promise<CreatePayeeResponse> {
  // Validate required fields
  if (!req.type || !req.name) {
    throw new contractAiError('Type and name are required for creating a payee');
  }

  // If type is US_ACH, validate required bank details
  if (req.type === 'US_ACH' && (!req.accountNumber || !req.routingNumber || !req.accountType)) {
    throw new contractAiError('Account number, routing number, and account type are required for ACH payees');
  }

  // Create payee via Payman service
  const payee = await paymanService.createPayee(req);

  // If we have a contractorId, we could store this association in your database
  if (req.contractorId) {
    // Store the payee ID with the contractor record in your database
    // This is pseudocode - implement according to your database schema
    // await storePayeeIdWithContractor(req.contractorId, payee.id);
  }

  return {
    payee,
    success: true
  };
}

async function sendPaymentHandler(req: SendPaymentRequest): Promise<SendPaymentResponse> {
  // Validate required fields
  if (req.amountDecimal === undefined || !req.payeeId) {
    throw new contractAiError('Amount and payee ID are required for sending a payment');
  }

  // Send payment via Payman service
  const payment = await paymanService.sendPayment({
    amountDecimal: req.amountDecimal,
    payeeId: req.payeeId,
    memo: req.memo,
    metadata: req.metadata
  });

  // If we have an invoiceId, update the invoice status to 'paid'
  if (req.invoiceId) {
    // This is pseudocode - implement according to your database schema and services
    // await invoiceService.markInvoiceAsPaid(req.invoiceId);
  }

  return {
    payment,
    success: true
  };
}

async function getPayeesHandler(req: GetPayeesRequest): Promise<GetPayeesResponse> {
  // Search for payees with optional filters
  const result = await paymanService.searchPayees({
    name: req.name,
    type: req.type
  });

  return {
    payees: result.payees
  };
}

export const paymanRouterConfig: RouteConfig = {
  router: paymanRouter,
  endpoints: {
    '/createPayee': {
      handler: createPayeeHandler,
      isUserScoped: false,
    },
    '/sendPayment': {
      handler: sendPaymentHandler,
      isUserScoped: false,
    },
    '/getPayees': {
      handler: getPayeesHandler,
      isUserScoped: false,
    }
  },
};
