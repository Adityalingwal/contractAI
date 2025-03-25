import { Company, CompanyDB } from "./types";

/**
 * Maps a database company row to the application Company type
 */
export function mapToCompany(dbRow: CompanyDB): Company {
  return {
    companyId: dbRow.company_id,
    companyName: dbRow.company_name,
    email: dbRow.email,
    phone: dbRow.phone || undefined,
    address: dbRow.address || undefined,
    description: dbRow.description || undefined,
    createdAt: dbRow.created_at
  };
}