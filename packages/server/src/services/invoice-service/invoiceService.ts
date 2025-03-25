import { 
    fetchInvoiceById,
    fetchInvoicesByTaskId,
    fetchInvoicesByContractorId,
    fetchInvoicesByCompanyId,
    upsertInvoice,
    deleteInvoice,
    updateInvoiceStatus,
    markInvoiceAsPaid
  } from '../../db/dao/invoices/invoicesDao';
  import { Invoice, InvoiceStatus } from '../../db/dao/invoices/types';
  import { contractAiError } from '../../error/contractAiError';
  
  /**
   * Get invoice by ID
   */
  export async function getInvoiceById(invoiceId: string): Promise<Invoice> {
    const invoice = await fetchInvoiceById(Number(invoiceId));
    if (!invoice) {
      throw new contractAiError(`Invoice with ID ${invoiceId} not found`);
    }
    return invoice;
  }
  
  /**
   * Get invoices by task ID
   */
  export async function getInvoicesByTaskId(taskId: string): Promise<Invoice[]> {
    return fetchInvoicesByTaskId(Number(taskId));
  }
  
  /**
   * Get invoices by contractor ID
   */
  export async function getInvoicesByContractorId(contractorId: string): Promise<Invoice[]> {
    return fetchInvoicesByContractorId(Number(contractorId));
  }
  
  /**
   * Get invoices by company ID
   */
  export async function getInvoicesByCompanyId(companyId: string): Promise<Invoice[]> {
    return fetchInvoicesByCompanyId(Number(companyId));
  }
  
  /**
   * Create or update an invoice
   */
  export async function createOrUpdateInvoice(invoice: Invoice): Promise<Invoice> {
    return upsertInvoice(invoice);
  }
  
  /**
   * Update invoice status
   */
  export async function changeInvoiceStatus(invoiceId: string, status: InvoiceStatus): Promise<Invoice> {
    const result = await updateInvoiceStatus(Number(invoiceId), status);
    if (!result) {
      throw new contractAiError(`Failed to update status for invoice ${invoiceId}`);
    }
    return result;
  }
  
  /**
   * Mark invoice as paid
   */
  export async function markAsPaid(invoiceId: string, paymentDate?: Date): Promise<Invoice> {
    const result = await markInvoiceAsPaid(Number(invoiceId), paymentDate);
    if (!result) {
      throw new contractAiError(`Failed to mark invoice ${invoiceId} as paid`);
    }
    return result;
  }
  
  /**
   * Remove an invoice
   */
  export async function removeInvoice(invoiceId: string): Promise<void> {
    await deleteInvoice(Number(invoiceId));
  }