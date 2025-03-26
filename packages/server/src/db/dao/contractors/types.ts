export interface Contractor {
  contractorId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  taxId?: string;
  bankAccount?: string;
  linkedinProfile?: string;
  profilePicture?: string;
  resume?: string;
  paymanPayeeId?: string; // Add this field to store Payman payee ID
  createdAt?: Date;
}

export interface ContractorDB {
  contractor_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  tax_id: string | null;
  bank_account: string | null;
  linkedin_profile: string | null;
  profile_picture: string | null;
  resume: string | null;
  payman_payee_id: string | null; // Add this for database mapping
  created_at: Date;
}