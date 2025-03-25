import { pool } from "../../dbClient";
import { Invoice, InvoiceDB, InvoiceStatus } from "./types";
import { mapToInvoice } from "./utils";

// Upsert an invoice (create or update)
export async function upsertInvoice(
  invoice: Invoice
): Promise<Invoice> {
  const query = invoice.invoiceId
    ? `UPDATE invoices SET 
        task_id = $1, 
        contractor_id = $2, 
        company_id = $3, 
        invoice_date = $4, 
        amount = $5, 
        tax_deduction = $6, 
        payment_method = $7, 
        status = $8, 
        payment_date = $9
      WHERE invoice_id = $10 
      RETURNING *`
    : `INSERT INTO invoices 
        (task_id, contractor_id, company_id, invoice_date, amount, tax_deduction, payment_method, status, payment_date)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;

  const values = [
    invoice.taskId,
    invoice.contractorId,
    invoice.companyId,
    invoice.invoiceDate || null,
    invoice.amount,
    invoice.taxDeduction || 0.00,
    invoice.paymentMethod,
    invoice.status || 'pending',
    invoice.paymentDate || null
  ];
  
  if (invoice.invoiceId) {
    values.push(invoice.invoiceId);
  }
  
  const result = await pool.query<InvoiceDB>(query, values);
  return mapToInvoice(result.rows[0]);
}

// Fetch invoice by ID
export async function fetchInvoiceById(id: number): Promise<Invoice | undefined> {
  const result = await pool.query<InvoiceDB>(
    'SELECT * FROM invoices WHERE invoice_id = $1',
    [id]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToInvoice(result.rows[0]);
}

// Fetch invoices by task ID
export async function fetchInvoicesByTaskId(taskId: number): Promise<Invoice[]> {
  const result = await pool.query<InvoiceDB>(
    'SELECT * FROM invoices WHERE task_id = $1',
    [taskId]
  );
  
  return result.rows.map(mapToInvoice);
}

// Fetch invoices by contractor ID
export async function fetchInvoicesByContractorId(contractorId: number): Promise<Invoice[]> {
  const result = await pool.query<InvoiceDB>(
    'SELECT * FROM invoices WHERE contractor_id = $1',
    [contractorId]
  );
  
  return result.rows.map(mapToInvoice);
}

// Fetch invoices by company ID
export async function fetchInvoicesByCompanyId(companyId: number): Promise<Invoice[]> {
  const result = await pool.query<InvoiceDB>(
    'SELECT * FROM invoices WHERE company_id = $1',
    [companyId]
  );
  
  return result.rows.map(mapToInvoice);
}

// Update invoice status
export async function updateInvoiceStatus(invoiceId: number, status: InvoiceStatus): Promise<Invoice | undefined> {
  const result = await pool.query<InvoiceDB>(
    'UPDATE invoices SET status = $1 WHERE invoice_id = $2 RETURNING *',
    [status, invoiceId]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToInvoice(result.rows[0]);
}

// Mark invoice as paid
export async function markInvoiceAsPaid(invoiceId: number, paymentDate: Date = new Date()): Promise<Invoice | undefined> {
  const result = await pool.query<InvoiceDB>(
    'UPDATE invoices SET status = $1, payment_date = $2 WHERE invoice_id = $3 RETURNING *',
    ['paid', paymentDate, invoiceId]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToInvoice(result.rows[0]);
}

// Delete invoice
export async function deleteInvoice(id: number): Promise<void> {
  await pool.query('DELETE FROM invoices WHERE invoice_id = $1', [id]);
}