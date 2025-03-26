import { post } from './client';

// Create a payee
export const createPayee = async (req: any): Promise<any> => {
  return await post('/payman/createPayee', req);
};

// Send a payment
export const sendPayment = async (req: any): Promise<any> => {
  return await post('/payman/sendPayment', req);
};

// Get payees with optional filters
export const getPayees = async (req?: any): Promise<any> => {
  return await post('/payman/getPayees', req);
};
