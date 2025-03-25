import { pool } from "../../dbClient";
import { Company, CompanyDB } from "./types";
import { mapToCompany } from "./utils";

// Upsert a company (create or update)
export async function upsertCompany(
  company: Company
): Promise<Company> {
  const query = company.companyId
    ? `UPDATE companies SET 
        company_name = $1, 
        email = $2, 
        phone = $3, 
        address = $4, 
        description = $5
      WHERE company_id = $6 
      RETURNING *`
    : `INSERT INTO companies 
        (company_name, email, phone, address, description)
      VALUES 
        ($1, $2, $3, $4, $5)
      RETURNING *`;

  const values = [
    company.companyName,
    company.email,
    company.phone || null,
    company.address || null,
    company.description || null
  ];
  
  if (company.companyId) {
    values.push(company.companyId);
  }
  
  const result = await pool.query<CompanyDB>(query, values);
  return mapToCompany(result.rows[0]);
}

// Fetch company by ID
export async function fetchCompanyById(id: number): Promise<Company | undefined> {
  const result = await pool.query<CompanyDB>(
    'SELECT * FROM companies WHERE company_id = $1',
    [id]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToCompany(result.rows[0]);
}

// Fetch company by email
export async function fetchCompanyByEmail(email: string): Promise<Company | undefined> {
  const result = await pool.query<CompanyDB>(
    'SELECT * FROM companies WHERE email = $1',
    [email]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToCompany(result.rows[0]);
}

// Fetch all companies
export async function fetchAllCompanies(): Promise<Company[]> {
  const result = await pool.query<CompanyDB>('SELECT * FROM companies');
  return result.rows.map(mapToCompany);
}

// Delete company
export async function deleteCompany(id: number): Promise<void> {
  await pool.query('DELETE FROM companies WHERE company_id = $1', [id]);
}