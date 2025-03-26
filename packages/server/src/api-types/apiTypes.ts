import { Contractor } from '../db/dao/contractors/types';
import { Company } from '../db/dao/companies/types';
import { Task, TaskStatus } from '../db/dao/tasks/types';
import { Skill } from '../db/dao/skills/types';
import { ContractorSkillWithName } from '../db/dao/contractorSkills/types';
import { Invoice, InvoiceStatus, PaymentMethod } from '../db/dao/invoices/types';

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

// Company API Types
export interface GetCompanyRequest {
  companyId: string;
}

export interface GetCompanyByEmailRequest {
  email: string;
}

export interface UpsertCompanyRequest {
  company: Company;
}

export interface DeleteCompanyRequest {
  companyId: string;
}

export interface GetAllCompaniesResponse {
  companies: Company[];
}

export interface GetCompanyResponse {
  company: Company;
}

export interface UpsertCompanyResponse {
  company: Company;
}

export interface DeleteCompanyResponse {
  success: boolean;
}

// Task API Types
export interface GetTaskRequest {
  taskId: string;
}

export interface GetTasksByCompanyRequest {
  companyId: string;
}

export interface GetTasksByContractorRequest {
  contractorId: string;
}

export interface UpsertTaskRequest {
  task: Task;
}

export interface AssignTaskRequest {
  taskId: string;
  contractorId: string;
}

export interface UpdateTaskStatusRequest {
  taskId: string;
  status: TaskStatus;
}

export interface DeleteTaskRequest {
  taskId: string;
}

export interface GetAllTasksResponse {
  tasks: Task[];
}

export interface GetTaskResponse {
  task: Task;
}

export interface GetTasksByCompanyResponse {
  tasks: Task[];
}

export interface GetTasksByContractorResponse {
  tasks: Task[];
}

export interface UpsertTaskResponse {
  task: Task;
}

export interface AssignTaskResponse {
  task: Task;
}

export interface UpdateTaskStatusResponse {
  task: Task;
}

export interface DeleteTaskResponse {
  success: boolean;
}

// Skill API Types
export interface GetSkillRequest {
  skillId: string;
}

export interface GetSkillByNameRequest {
  name: string;
}

export interface UpsertSkillRequest {
  skill: Skill;
}

export interface DeleteSkillRequest {
  skillId: string;
}

export interface GetAllSkillsResponse {
  skills: Skill[];
}

export interface GetSkillResponse {
  skill: Skill;
}

export interface UpsertSkillResponse {
  skill: Skill;
}

export interface DeleteSkillResponse {
  success: boolean;
}

// ContractorSkill API Types
export interface GetContractorSkillsRequest {
  contractorId: string;
}

export interface GetContractorsWithSkillRequest {
  skillId: string;
}

export interface AddSkillRequest {
  contractorId: string;
  skillId: string;
}

export interface RemoveSkillRequest {
  contractorId: string;
  skillId: string;
}

export interface CheckSkillRequest {
  contractorId: string;
  skillId: string;
}

export interface AddMultipleSkillsRequest {
  contractorId: string;
  skillIds: string[];
}

export interface RemoveAllSkillsRequest {
  contractorId: string;
}

export interface GetContractorSkillsResponse {
  skills: ContractorSkillWithName[];
}

export interface GetContractorsWithSkillResponse {
  contractorIds: number[];
}

export interface AddSkillResponse {
  success: boolean;
}

export interface RemoveSkillResponse {
  success: boolean;
}

export interface CheckSkillResponse {
  hasSkill: boolean;
}

export interface AddMultipleSkillsResponse {
  success: boolean;
}

export interface RemoveAllSkillsResponse {
  success: boolean;
}

// Invoice API Types
export interface GetInvoiceRequest {
  invoiceId: string;
}

export interface GetInvoicesByTaskRequest {
  taskId: string;
}

export interface GetInvoicesByContractorRequest {
  contractorId: string;
}

export interface GetInvoicesByCompanyRequest {
  companyId: string;
}

export interface UpsertInvoiceRequest {
  invoice: Invoice;
}

export interface UpdateInvoiceStatusRequest {
  invoiceId: string;
  status: InvoiceStatus;
}

export interface MarkInvoiceAsPaidRequest {
  invoiceId: string;
  paymentDate?: string;
}

export interface DeleteInvoiceRequest {
  invoiceId: string;
}

export interface GetAllInvoicesResponse {
  invoices: Invoice[];
}

export interface GetInvoiceResponse {
  invoice: Invoice;
}

export interface GetInvoicesByTaskResponse {
  invoices: Invoice[];
}

export interface GetInvoicesByContractorResponse {
  invoices: Invoice[];
}

export interface GetInvoicesByCompanyResponse {
  invoices: Invoice[];
}

export interface UpsertInvoiceResponse {
  invoice: Invoice;
}

export interface UpdateInvoiceStatusResponse {
  invoice: Invoice;
}

export interface MarkInvoiceAsPaidResponse {
  invoice: Invoice;
}

export interface DeleteInvoiceResponse {
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