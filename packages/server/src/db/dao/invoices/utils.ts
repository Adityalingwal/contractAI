import { Invoice, InvoiceDB } from "./types";

/**
 * Maps a database invoice row to the application Invoice type
 */
export function mapToInvoice(dbRow: InvoiceDB): Invoice {
  return {
    invoiceId: dbRow.invoice_id,
    taskId: dbRow.task_id,
    contractorId: dbRow.contractor_id,
    companyId: dbRow.company_id,
    invoiceDate: dbRow.invoice_date || undefined,
    amount: dbRow.amount,
    taxDeduction: dbRow.tax_deduction,
    paymentMethod: dbRow.payment_method,
    status: dbRow.status,
    paymentDate: dbRow.payment_date || undefined,
    createdAt: dbRow.created_at
  };
}