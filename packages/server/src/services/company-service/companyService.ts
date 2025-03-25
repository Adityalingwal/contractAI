import { 
    fetchCompanyById, 
    fetchCompanyByEmail, 
    fetchAllCompanies, 
    upsertCompany, 
    deleteCompany 
  } from '../../db/dao/companies/companiesDao';
  import { Company } from '../../db/dao/companies/types';
  import { contractAiError } from '../../error/contractAiError';
  
  /**
   * Get company by ID
   */
  export async function getCompanyById(companyId: string): Promise<Company> {
    const company = await fetchCompanyById(Number(companyId));
    if (!company) {
      throw new contractAiError(`Company with ID ${companyId} not found`);
    }
    return company;
  }
  
  /**
   * Get company by email
   */
  export async function getCompanyByEmail(email: string): Promise<Company | undefined> {
    return fetchCompanyByEmail(email);
  }
  
  /**
   * Get all companies
   */
  export async function getAllCompanies(): Promise<Company[]> {
    return fetchAllCompanies();
  }
  
  /**
   * Create or update a company
   */
  export async function createOrUpdateCompany(company: Company): Promise<Company> {
    return upsertCompany(company);
  }
  
  /**
   * Remove a company
   */
  export async function removeCompany(companyId: string): Promise<void> {
    await deleteCompany(Number(companyId));
  }