
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
    created_at: Date;
  }