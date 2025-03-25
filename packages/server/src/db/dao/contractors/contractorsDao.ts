import { pool } from '../../dbClient';
import { Contractor, ContractorDB } from './types';
import { mapToContractor } from './utils';

export async function upsertContractor(contractor: Contractor): Promise<Contractor> {
  const query = contractor.contractorId
    ? `UPDATE contractors SET 
        first_name = $1, 
        last_name = $2, 
        email = $3, 
        phone = $4, 
        address = $5, 
        tax_id = $6, 
        bank_account = $7, 
        linkedin_profile = $8, 
        profile_picture = $9, 
        resume = $10 
      WHERE contractor_id = $11 
      RETURNING *`
    : `INSERT INTO contractors 
        (first_name, last_name, email, phone, address, tax_id, bank_account, linkedin_profile, profile_picture, resume)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`;

  const values = [
    contractor.firstName,
    contractor.lastName,
    contractor.email,
    contractor.phone || null,
    contractor.address || null,
    contractor.taxId || null,
    contractor.bankAccount || null,
    contractor.linkedinProfile || null,
    contractor.profilePicture || null,
    contractor.resume || null,
  ];

  if (contractor.contractorId) {
    values.push(contractor.contractorId);
  }

  const result = await pool.query<ContractorDB>(query, values);
  return mapToContractor(result.rows[0]);
}

export async function fetchContractorById(id: number): Promise<Contractor | undefined> {
  const result = await pool.query<ContractorDB>(
    'SELECT * FROM contractors WHERE contractor_id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractor(result.rows[0]);
}

export async function fetchContractorByEmail(email: string): Promise<Contractor | undefined> {
  const result = await pool.query<ContractorDB>('SELECT * FROM contractors WHERE email = $1', [
    email,
  ]);

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractor(result.rows[0]);
}

export async function fetchAllContractors(): Promise<Contractor[]> {
  const result = await pool.query<ContractorDB>('SELECT * FROM contractors');
  return result.rows.map(mapToContractor);
}

export async function deleteContractor(id: number): Promise<void> {
  await pool.query('DELETE FROM contractors WHERE contractor_id = $1', [id]);
}
