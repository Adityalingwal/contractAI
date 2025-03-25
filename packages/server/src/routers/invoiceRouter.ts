import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import {
  getInvoiceById,
  getInvoicesByTaskId,
  getInvoicesByContractorId,
  getInvoicesByCompanyId,
  createOrUpdateInvoice,
  changeInvoiceStatus,
  markAsPaid,
  removeInvoice
} from '../services/invoice-service/invoiceService';
import {
  GetInvoiceRequest,
  GetInvoiceResponse,
  GetInvoicesByTaskRequest,
  GetInvoicesByTaskResponse,
  GetInvoicesByContractorRequest,
  GetInvoicesByContractorResponse,
  GetInvoicesByCompanyRequest,
  GetInvoicesByCompanyResponse,
  UpsertInvoiceRequest,
  UpsertInvoiceResponse,
  UpdateInvoiceStatusRequest,
  UpdateInvoiceStatusResponse,
  MarkInvoiceAsPaidRequest,
  MarkInvoiceAsPaidResponse,
  DeleteInvoiceRequest,
  DeleteInvoiceResponse
} from '../api-types/apiTypes';

const invoiceRouter = Router();

async function getInvoiceHandler(req: GetInvoiceRequest): Promise<GetInvoiceResponse> {
  const { invoiceId } = req;
  if (!invoiceId) {
    throw new contractAiError('invoiceId is required');
  }
  
  const invoice = await getInvoiceById(invoiceId);
  return { invoice };
}

async function getInvoicesByTaskHandler(req: GetInvoicesByTaskRequest): Promise<GetInvoicesByTaskResponse> {
  const { taskId } = req;
  if (!taskId) {
    throw new contractAiError('taskId is required');
  }
  
  const invoices = await getInvoicesByTaskId(taskId);
  return { invoices };
}

async function getInvoicesByContractorHandler(req: GetInvoicesByContractorRequest): Promise<GetInvoicesByContractorResponse> {
  const { contractorId } = req;
  if (!contractorId) {
    throw new contractAiError('contractorId is required');
  }
  
  const invoices = await getInvoicesByContractorId(contractorId);
  return { invoices };
}

async function getInvoicesByCompanyHandler(req: GetInvoicesByCompanyRequest): Promise<GetInvoicesByCompanyResponse> {
  const { companyId } = req;
  if (!companyId) {
    throw new contractAiError('companyId is required');
  }
  
  const invoices = await getInvoicesByCompanyId(companyId);
  return { invoices };
}

async function upsertInvoiceHandler(req: UpsertInvoiceRequest): Promise<UpsertInvoiceResponse> {
  const { invoice } = req;
  if (!invoice) {
    throw new contractAiError('invoice data is required');
  }
  
  const updatedInvoice = await createOrUpdateInvoice(invoice);
  return { invoice: updatedInvoice };
}

async function updateInvoiceStatusHandler(req: UpdateInvoiceStatusRequest): Promise<UpdateInvoiceStatusResponse> {
  const { invoiceId, status } = req;
  if (!invoiceId || !status) {
    throw new contractAiError('invoiceId and status are required');
  }
  
  const invoice = await changeInvoiceStatus(invoiceId, status);
  return { invoice };
}

async function markInvoiceAsPaidHandler(req: MarkInvoiceAsPaidRequest): Promise<MarkInvoiceAsPaidResponse> {
  const { invoiceId, paymentDate } = req;
  if (!invoiceId) {
    throw new contractAiError('invoiceId is required');
  }
  
  const invoice = await markAsPaid(invoiceId, paymentDate ? new Date(paymentDate) : undefined);
  return { invoice };
}

async function deleteInvoiceHandler(req: DeleteInvoiceRequest): Promise<DeleteInvoiceResponse> {
  const { invoiceId } = req;
  if (!invoiceId) {
    throw new contractAiError('invoiceId is required');
  }
  
  await removeInvoice(invoiceId);
  return { success: true };
}

export const invoiceRouterConfig: RouteConfig = {
  router: invoiceRouter,
  endpoints: {
    '/getInvoice': {
      handler: getInvoiceHandler,
      isUserScoped: false,
    },
    '/getInvoicesByTask': {
      handler: getInvoicesByTaskHandler,
      isUserScoped: false,
    },
    '/getInvoicesByContractor': {
      handler: getInvoicesByContractorHandler,
      isUserScoped: false,
    },
    '/getInvoicesByCompany': {
      handler: getInvoicesByCompanyHandler,
      isUserScoped: false,
    },
    '/upsertInvoice': {
      handler: upsertInvoiceHandler,
      isUserScoped: false,
    },
    '/updateInvoiceStatus': {
      handler: updateInvoiceStatusHandler,
      isUserScoped: false,
    },
    '/markAsPaid': {
      handler: markInvoiceAsPaidHandler,
      isUserScoped: false,
    },
    '/deleteInvoice': {
      handler: deleteInvoiceHandler,
      isUserScoped: false,
    }
  }
};