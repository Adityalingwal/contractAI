import {
  fetchContractorById,
  fetchContractorByEmail,
  fetchAllContractors,
  upsertContractor,
  deleteContractor,
  assignContractToContractor as assignContract,
  getContractorAssignments as fetchContractorAssignments,
  completeGigAssignment,
  fetchGigsWithStatus,
  createContractor,
} from '../../db/dao/contractors/contractorsDao';
import { Contractor, ContractAssignment, GigWithStatus } from '../../db/dao/contractors/types';
import { contractAiError } from '../../error/contractAiError';
import { insertGig } from '../../db/dao/gigs/gigsDao';
import { Gig } from '../../db/dao/gigs/types';
import { createPayee } from '../payman-service/paymanService';

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

export async function createOrUpdateContractor(contractor: Contractor): Promise<Contractor> {
  return upsertContractor(contractor);
}

export async function removeContractor(contractorId: string): Promise<void> {
  await deleteContractor(Number(contractorId));
}

export async function createContractorProfile(contractorData: any): Promise<any> {
  try {
    let payeeId = null;

    try {
      const payeeResponse = await createPayee({
        type: 'TEST_RAILS',
        name: contractorData.fullName,
        contactDetails: {
          email: contractorData.email,
        },
        tags: ['contractor'],
      });

      payeeId = payeeResponse.id;
      console.log('Created payee with ID:', payeeId);
    } catch (payeeError) {
      console.error('Error creating payee for contractor:', payeeError);
    }

    const contractorWithPayee = {
      ...contractorData,
      payeeId,
    };

    const contractor = await createContractor(contractorWithPayee);
    return contractor;
  } catch (error) {
    throw new Error(`Failed to create contractor profile: ${(error as Error).message}`);
  }
}

export async function postContract(req: any): Promise<Gig> {
  if (!req || !req.contractData) {
    throw new contractAiError('Contract data is required');
  }

  const contractData = req.contractData;

  if (
    !contractData.title ||
    !contractData.description ||
    !contractData.required_skills ||
    !contractData.experience_level ||
    !contractData.estimated_duration ||
    !contractData.hourly_rate
  ) {
    throw new contractAiError('Missing required fields in contract data');
  }
  try {
    const gig: Gig = {
      title: contractData.title,
      description: contractData.description,
      requiredSkills: contractData.required_skills,
      experienceLevel: contractData.experience_level,
      estimatedDuration: contractData.estimated_duration,
      hourlyRate: parseFloat(contractData.hourly_rate),
    };

    return await insertGig(gig);
  } catch (error) {
    console.error('Error creating contract:', error);
    throw new contractAiError('Failed to create contract');
  }
}

export async function assignContractToContractor(
  gigId: string,
  contractorId: string
): Promise<ContractAssignment> {
  if (!gigId || !contractorId) {
    throw new contractAiError('Gig ID and Contractor ID are required');
  }

  try {
    return await assignContract(gigId, contractorId);
  } catch (error) {
    throw new contractAiError('Failed to assign contract to contractor');
  }
}

export async function getContractorAssignments(contractorId: string): Promise<any[]> {
  if (!contractorId) {
    throw new contractAiError('Contractor ID is required');
  }

  try {
    return await fetchContractorAssignments(contractorId);
  } catch (error) {
    console.error('Error fetching contractor assignments:', error);
    throw new contractAiError('Failed to fetch contractor assignments');
  }
}

export async function submitGigCompletion(assignmentId: string, projectLink: string): Promise<any> {
  if (!assignmentId) {
    throw new contractAiError('Assignment ID is required');
  }

  if (!projectLink) {
    throw new contractAiError('Project link is required');
  }

  try {
    const updatedAssignment = await completeGigAssignment(assignmentId, projectLink);
    return updatedAssignment;
  } catch (error) {
    console.error('Error completing gig assignment:', error);
    throw new contractAiError('Failed to complete the gig assignment');
  }
}

export async function getGigsWithStatus(): Promise<GigWithStatus[]> {
  try {
    return await fetchGigsWithStatus();
  } catch (error) {
    console.error('Error fetching gigs with status:', error);
    throw new contractAiError('Failed to fetch gigs with status');
  }
}
