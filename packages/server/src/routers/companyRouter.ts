import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import {
  getAllCompanies,
  getCompanyById,
  getCompanyByEmail,
  createOrUpdateCompany,
  removeCompany
} from '../services/company-service/companyService';
import {
  GetCompanyRequest,
  GetCompanyResponse,
  GetCompanyByEmailRequest,
  UpsertCompanyRequest,
  UpsertCompanyResponse,
  DeleteCompanyRequest,
  DeleteCompanyResponse,
  GetAllCompaniesResponse
} from '../api-types/apiTypes';

const companyRouter = Router();

async function getAllCompaniesHandler(): Promise<GetAllCompaniesResponse> {
  const companies = await getAllCompanies();
  return { companies };
}

async function getCompanyHandler(req: GetCompanyRequest): Promise<GetCompanyResponse> {
  const { companyId } = req;
  if (!companyId) {
    throw new contractAiError('companyId is required');
  }
  
  const company = await getCompanyById(companyId);
  return { company };
}

async function getCompanyByEmailHandler(req: GetCompanyByEmailRequest): Promise<GetCompanyResponse> {
  const { email } = req;
  if (!email) {
    throw new contractAiError('email is required');
  }
  
  const company = await getCompanyByEmail(email);
  if (!company) {
    throw new contractAiError(`Company with email ${email} not found`);
  }
  
  return { company };
}

async function upsertCompanyHandler(req: UpsertCompanyRequest): Promise<UpsertCompanyResponse> {
  const { company } = req;
  if (!company) {
    throw new contractAiError('company data is required');
  }
  
  const updatedCompany = await createOrUpdateCompany(company);
  return { company: updatedCompany };
}

async function deleteCompanyHandler(req: DeleteCompanyRequest): Promise<DeleteCompanyResponse> {
  const { companyId } = req;
  if (!companyId) {
    throw new contractAiError('companyId is required');
  }
  
  await removeCompany(companyId);
  return { success: true };
}

export const companyRouterConfig: RouteConfig = {
  router: companyRouter,
  endpoints: {
    '/getAllCompanies': {
      handler: getAllCompaniesHandler,
      isUserScoped: false,
    },
    '/getCompany': {
      handler: getCompanyHandler,
      isUserScoped: false,
    },
    '/getCompanyByEmail': {
      handler: getCompanyByEmailHandler,
      isUserScoped: false,
    },
    '/upsertCompany': {
      handler: upsertCompanyHandler,
      isUserScoped: false,
    },
    '/deleteCompany': {
      handler: deleteCompanyHandler,
      isUserScoped: false,
    }
  }
};