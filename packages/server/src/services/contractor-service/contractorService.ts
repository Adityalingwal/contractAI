import { 
    fetchContractorById, 
    fetchContractorByEmail, 
    fetchAllContractors, 
    upsertContractor, 
    deleteContractor 
  } from '../../db/dao/contractors/contractorsDao';
  import { Contractor } from '../../db/dao/contractors/types';
  import { contractAiError } from '../../error/contractAiError';
  
  export async function getContractorById(contractorId: string): Promise<Contractor> {
    const contractor = await fetchContractorById(Number(contractorId));
    if (!contractor) {
      throw new contractAiError(`Contractor with ID ${contractorId} not found`);
    }
    return contractor;
  }
  
  /**
   * Get contractor by email
   */
  export async function getContractorByEmail(email: string): Promise<Contractor | undefined> {
    return fetchContractorByEmail(email);
  }
  
  /**
   * Get all contractors
   */
  export async function getAllContractors(): Promise<Contractor[]> {
    return fetchAllContractors();
  }
  
  /**
   * Create or update a contractor
   */
  export async function createOrUpdateContractor(contractor: Contractor): Promise<Contractor> {
    return upsertContractor(contractor);
  }
  
  /**
   * Remove a contractor
   */
  export async function removeContractor(contractorId: string): Promise<void> {
    await deleteContractor(Number(contractorId));
  }