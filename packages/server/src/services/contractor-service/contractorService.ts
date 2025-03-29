import { 
    fetchContractorById, 
    fetchContractorByEmail, 
    fetchAllContractors, 
    upsertContractor, 
    deleteContractor 
  } from '../../db/dao/contractors/contractorsDao';
  import { Contractor } from '../../db/dao/contractors/types';
  import { contractAiError } from '../../error/contractAiError';
  import { insertGig } from '../../db/dao/gigs/gigsDao';
  import { Gig } from '../../db/dao/gigs/types';
  
  export async function getContractorById(contractorId: string): Promise<Contractor> {
    const contractor = await fetchContractorById(Number(contractorId));
    if (!contractor) {
      throw new contractAiError(`Contractor with ID ${contractorId} not found`);
    }
    return contractor;
  }
  
  export async function getContractorByEmail(email: string): Promise<Contractor | undefined> {
    return fetchContractorByEmail(email);
  }

  export async function getAllContractors(): Promise<Contractor[]> {
    return fetchAllContractors();
  }
  
  export async function createOrUpdateContractor(contractor: Contractor): Promise<Contractor> {
    return upsertContractor(contractor);
  }
  
  export async function removeContractor(contractorId: string): Promise<void> {
    await deleteContractor(Number(contractorId));
  }

export async function createContractorProfile(profileData: any): Promise<Contractor> {
  if (!profileData) {
    throw new contractAiError('Profile data is required');
  }

  console.log("profile data is :",profileData)

  if (!profileData.fullName || !profileData.email || !profileData.professionalTitle || 
      !profileData.bio || !profileData.experienceLevel || !profileData.hourlyRate || 
      !profileData.skills || !profileData.portfolioLink || !profileData.availability || !profileData.availableFrom) {
    throw new contractAiError('Missing required fields in profile data');
  }
  
  try {
    const existingContractor = await getContractorByEmail(profileData.email);
    
    if (existingContractor) {
      profileData.contractorId = existingContractor.contractorId;
    }
  
    return await upsertContractor(profileData);
  } catch (error) {
    console.error('Error creating contractor profile:', error);
    throw new contractAiError('Failed to create contractor profile');
  }
}

export async function postContract(req: any): Promise<Gig> {
  if (!req || !req.contractData) {
    throw new contractAiError('Contract data is required');
  }

  const contractData = req.contractData;

  if (!contractData.title || !contractData.description || 
      !contractData.required_skills || !contractData.experience_level ||
      !contractData.estimated_duration || !contractData.hourly_rate) {
    throw new contractAiError('Missing required fields in contract data');
  }
  try {
    const gig: Gig = {
      title: contractData.title,
      description: contractData.description,
      requiredSkills: contractData.required_skills,
      experienceLevel: contractData.experience_level,
      estimatedDuration: contractData.estimated_duration,
      hourlyRate: parseFloat(contractData.hourly_rate)
    };
    
    return await insertGig(gig);
  } catch (error) {
    console.error('Error creating contract:', error);
    throw new contractAiError('Failed to create contract');
  }
}