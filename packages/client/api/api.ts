import { post } from './client';

// Create a payee
export const createPayee = async (data: any): Promise<any> => {
  return await post('/payman/createPayee', data);
};

// Send a payment
export const sendPayment = async (data: any): Promise<any> => {
  return await post('/payman/sendPayment', data);
};

// Get payees with optional filters
export const getPayees = async (data?: any): Promise<any> => {
  return await post('/payman/getPayees', data || {});
};
