import { post } from './client';

export const getAllContracts = async (): Promise<any> => {
  return await post('/contractor/getAllContracts');
};

export const submitProfile = async (req: any): Promise<any> => {
  return await post('/contractor/createProfile', req);
}

export const postContract = async (req: any): Promise<any> => {
  return await post('/contractor/postContract', req);
};

export const getAllContractors = async (): Promise<any> => {
  return await post('/contractor/getAllContractors');
}

export const getAllGigs = async (): Promise<any> => {
  return await post('/contractor/getAllGigs');
}

export const assignContractToContractor = async (req: any): Promise<any> => {
  console.log("API call - assignContractToContractor with params:", req);
  try {
    const response = await post('/contractor/assignContract', req);
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error in assignContractToContractor:", error);
    throw error;
  }
};

export const getContractorAssignments = async (contractorId: string): Promise<any> => {
  return await post('/contractor/getContractorAssignments', { contractorId });
};

export const getContractorByEmail = async (req: { email: string }): Promise<any> => {
  return await post('/contractor/getContractorByEmail', req);
};

export const submitGigCompletion = async (payload: { assignmentId: string; projectLink: string }): Promise<any> => {
  return await post('/contractor/submitGigCompletion', payload);
};

export const getGigsWithStatus = async (): Promise<any> => {
  return await post('/contractor/getGigsWithStatus', {});
};

export const getCompletedGigsForPayment = async (): Promise<any> => {
  return await post('/payment/getCompletedGigs', {});
};

export const sendGigPayment = async (payload: { 
  assignmentId: string; 
  payeeId: string; 
  amount: number;
  gigTitle: string;
}): Promise<any> => {
  return await post('/payment/sendGigPayment', payload);
};

