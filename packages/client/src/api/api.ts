import { post } from './client';

export const createPayee = async (req: any): Promise<any> => {
  return await post('/payman/createPayee', req);
};

export const sendPayment = async (req: any): Promise<any> => {
  return await post('/payman/sendPayment', req);
};

export const getPayees = async (req?: any): Promise<any> => {
  return await post('/payman/getPayees', req);
};

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
  return await post('/contractor/assignContract', req);
};