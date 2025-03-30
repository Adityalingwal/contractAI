import { Contractor } from '../db/dao/contractors/types';

// Contractor API Types
export interface GetContractorRequest {
  contractorId: string;
}

export interface GetContractorByEmailRequest {
  email: string;
}

export interface UpsertContractorRequest {
  contractor: Contractor;
}

export interface DeleteContractorRequest {
  contractorId: string;
}

export interface GetAllContractorsResponse {
  contractors: Contractor[];
}

export interface GetContractorResponse {
  contractor: Contractor;
}

export interface UpsertContractorResponse {
  contractor: Contractor;
}

export interface DeleteContractorResponse {
  success: boolean;
}

// Payman API Types
export interface CreatePayeeRequest {
  type: 'US_ACH' | 'TEST_RAILS';
  name: string;
  accountHolderName?: string;
  accountHolderType?: 'individual' | 'company';
  accountNumber?: string;
  routingNumber?: string;
  accountType?: 'checking' | 'savings';
  contactDetails?: {
    email?: string;
    phone?: string;
  };
  tags?: string[];
  contractorId?: string; // Optional: to associate payee with contractor
}

export interface CreatePayeeResponse {
  payee: {
    id: string;
    type: string;
    name: string;
    createdAt: string;
    tags?: string[];
  };
  success: boolean;
}

export interface SendPaymentRequest {
  amountDecimal: number;
  payeeId: string;
  memo?: string;
  metadata?: Record<string, any>;
  invoiceId?: string;
}

export interface SendPaymentResponse {
  payment: {
    id: string;
    status: string;
    amountDecimal: number;
    payeeId: string;
    memo?: string;
    metadata?: Record<string, any>;
    createdAt: string;
  };
  success: boolean;
}

export interface GetPayeesRequest {
  name?: string;
  type?: string;
}

export interface GetPayeesResponse {
  payees: Array<{
    id: string;
    type: string;
    name: string;
    createdAt: string;
    tags?: string[];
  }>;
}
