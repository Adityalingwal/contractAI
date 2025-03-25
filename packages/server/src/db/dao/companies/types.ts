// Define the Company type for application use
export interface Company {
    companyId?: string;
    companyName: string;
    email: string;
    phone?: string;
    address?: string;
    description?: string;
    createdAt?: Date;
  }
  
  // Define the database response type (snake_case)
  export interface CompanyDB {
    company_id: string;
    company_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    description: string | null;
    created_at: Date;
  }