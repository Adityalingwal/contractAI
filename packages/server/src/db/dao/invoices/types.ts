// Payment method and invoice status enums
export type PaymentMethod = 'ACH' | 'USDC';
export type InvoiceStatus = 'pending' | 'paid' | 'failed';

// Define the Invoice type for application use
export interface Invoice {
  invoiceId?: number;
  taskId: number;
  contractorId: number;
  companyId: number;
  invoiceDate?: Date;
  amount: number;
  taxDeduction?: number;
  paymentMethod: PaymentMethod;
  status?: InvoiceStatus;
  paymentDate?: Date;
  createdAt?: Date;
}

// Define the database response type (snake_case)
export interface InvoiceDB {
  invoice_id: number;
  task_id: number;
  contractor_id: number;
  company_id: number;
  invoice_date: Date | null;
  amount: number;
  tax_deduction: number;
  payment_method: PaymentMethod;
  status: InvoiceStatus;
  payment_date: Date | null;
  created_at: Date;
}