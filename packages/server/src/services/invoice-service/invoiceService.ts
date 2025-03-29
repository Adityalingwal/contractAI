import {
  fetchInvoiceById,
  fetchInvoicesByTaskId,
  fetchInvoicesByContractorId,
  fetchInvoicesByCompanyId,
  upsertInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  markInvoiceAsPaid as markInvoiceAsPaidDao,
} from '../../db/dao/invoices/invoicesDao';
import { Invoice, InvoiceStatus, PaymentMethod } from '../../db/dao/invoices/types';
import { contractAiError } from '../../error/contractAiError';
import { sendPayment } from '../payman-service/paymanService';
import { getContractorById } from '../contractor-service/contractorService';

export async function getInvoiceById(invoiceId: string): Promise<Invoice> {
  const invoice = await fetchInvoiceById(Number(invoiceId));
  if (!invoice) {
    throw new contractAiError(`Invoice with ID ${invoiceId} not found`);
  }
  return invoice;
}

export async function getInvoicesByTaskId(taskId: string): Promise<Invoice[]> {
  return fetchInvoicesByTaskId(Number(taskId));
}

export async function getInvoicesByContractorId(contractorId: string): Promise<Invoice[]> {
  return fetchInvoicesByContractorId(Number(contractorId));
}

export async function getInvoicesByCompanyId(companyId: string): Promise<Invoice[]> {
  return fetchInvoicesByCompanyId(Number(companyId));
}

export async function createOrUpdateInvoice(invoice: Invoice): Promise<Invoice> {
  return upsertInvoice(invoice);
}

export async function changeInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus
): Promise<Invoice> {
  const result = await updateInvoiceStatus(Number(invoiceId), status);
  if (!result) {
    throw new contractAiError(`Failed to update status for invoice ${invoiceId}`);
  }
  return result;
}

export async function markAsPaid(invoiceId: string, paymentDate?: Date): Promise<Invoice> {
  const invoice = await getInvoiceById(invoiceId);

  // Only process if the invoice is not already paid
  if (invoice.status !== 'paid') {
    // If payment method is ACH or USDC, process through Payman
    if (invoice.paymentMethod === 'ACH' || invoice.paymentMethod === 'USDC' || invoice.paymentMethod === 'TEST_RAILS') {
      try {
        // Get the contractor details to retrieve payee information
        const contractor = await getContractorById(invoice.contractorId.toString());

        // This assumes you have stored the Payman payee ID in the contractor metadata
        // You may need to adjust based on your data model
        // const payeeId = contractor.paymanPayeeId; // This field would need to be added to your Contractor model

        // if (!payeeId) {
        //   throw new contractAiError(
        //     `No Payman payee ID found for contractor ${invoice.contractorId}`
        //   );
        // }

        // await sendPayment({
        //   amountDecimal: invoice.amount,
        //   payeeId: payeeId,
        //   memo: `Invoice #${invoice.invoiceId}`,
        //   metadata: {
        //     invoiceId: invoice.invoiceId,
        //     taskId: invoice.taskId,
        //     contractorId: invoice.contractorId,
        //     companyId: invoice.companyId,
        //   },
        // });
      } catch (error) {
        throw new contractAiError(`Payment processing failed: ${(error as Error).message}`);
      }
    }
  }

  const result = await markInvoiceAsPaidDao(Number(invoiceId), paymentDate);
  if (!result) {
    throw new contractAiError(`Failed to mark invoice ${invoiceId} as paid`);
  }
  return result;
}

export async function removeInvoice(invoiceId: string): Promise<void> {
  await deleteInvoice(Number(invoiceId));
}
