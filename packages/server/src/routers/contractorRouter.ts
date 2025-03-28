import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import {
  getAllContractors,
  getContractorById,
  getContractorByEmail,
  createOrUpdateContractor,
  removeContractor
} from '../services/contractor-service/contractorService';
import {
  GetContractorRequest,
  GetContractorResponse,
  GetContractorByEmailRequest,
  UpsertContractorRequest,
  UpsertContractorResponse,
  DeleteContractorRequest,
  DeleteContractorResponse,
  GetAllContractorsResponse
} from '../api-types/apiTypes';

const contractorRouter = Router();

async function getAllContractorsHandler(): Promise<GetAllContractorsResponse> {
  const contractors = await getAllContractors();
  return { contractors };
}

async function getContractorHandler(req: GetContractorRequest): Promise<GetContractorResponse> {
  const { contractorId } = req;
  if (!contractorId) {
    throw new contractAiError('contractorId is required');
  }
  
  const contractor = await getContractorById(contractorId);
  return { contractor };
}

async function getContractorByEmailHandler(req: GetContractorByEmailRequest): Promise<GetContractorResponse> {
  const { email } = req;
  if (!email) {
    throw new contractAiError('email is required');
  }
  
  const contractor = await getContractorByEmail(email);
  if (!contractor) {
    throw new contractAiError(`Contractor with email ${email} not found`);
  }
  
  return { contractor };
}

async function upsertContractorHandler(req: UpsertContractorRequest): Promise<UpsertContractorResponse> {
  const { contractor } = req;
  if (!contractor) {
    throw new contractAiError('contractor data is required');
  }
  
  const updatedContractor = await createOrUpdateContractor(contractor);
  return { contractor: updatedContractor };
}

async function deleteContractorHandler(req: DeleteContractorRequest): Promise<DeleteContractorResponse> {
  const { contractorId } = req;
  if (!contractorId) {
    throw new contractAiError('contractorId is required');
  }
  
  await removeContractor(contractorId);
  return { success: true };
}

export async function getAllContractsHandler(): Promise<any> {
  console.log('sucessful get the request and return the response');
  return { message : 'success' };
}


export const contractorRouterConfig: RouteConfig = {
  router: contractorRouter,
  endpoints: {
    '/getAllContractors': {
      handler: getAllContractorsHandler,
      isUserScoped: false,
    },
    '/getContractor': {
      handler: getContractorHandler,
      isUserScoped: false,
    },
    '/getContractorByEmail': {
      handler: getContractorByEmailHandler,
      isUserScoped: false,
    },
    '/upsertContractor': {
      handler: upsertContractorHandler,
      isUserScoped: false,
    },
    '/deleteContractor': {
      handler: deleteContractorHandler,
      isUserScoped: false,
    },
    '/getAllContracts': {
      handler: getAllContractsHandler,
      isUserScoped: false,
    }
  }
}