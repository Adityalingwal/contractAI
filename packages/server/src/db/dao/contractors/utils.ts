import { ContractorDB, Contractor  } from "./types";

export function mapToContractor(dbRow: ContractorDB): Contractor {
    return {
      contractorId: dbRow.contractor_id,
      firstName: dbRow.first_name,
      lastName: dbRow.last_name,
      email: dbRow.email,
      phone: dbRow.phone || undefined,
      address: dbRow.address || undefined,
      taxId: dbRow.tax_id || undefined,
      bankAccount: dbRow.bank_account || undefined,
      linkedinProfile: dbRow.linkedin_profile || undefined,
      profilePicture: dbRow.profile_picture || undefined,
      resume: dbRow.resume || undefined,
      createdAt: dbRow.created_at
    };
  }