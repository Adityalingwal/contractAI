import fetch from 'node-fetch';
import { contractAiError } from '../../error/contractAiError';
import {
  PayeeCreationRequest,
  PayeeResponse,
  PaymentRequest,
  PaymentResponse,
  SearchPayeesOptions,
  SearchPayeesResponse,
} from './types';
import dotenv from 'dotenv';

dotenv.config();

const PAYMAN_API_SECRET = process.env.PAYMAN_API_SECRET || '';
const PAYMAN_API_BASE_URL = 'https://agent.payman.ai/api';

export async function createPayee(
  payeeData: PayeeCreationRequest,
  apiSecret = PAYMAN_API_SECRET
): Promise<PayeeResponse> {
  try {
    const response = await fetch(`${PAYMAN_API_BASE_URL}/payees/create-payee`, {
      method: 'POST',
      headers: {
        'x-payman-api-secret': apiSecret,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payeeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new contractAiError(
        `Failed to create payee: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new contractAiError(`Error creating payee: ${(error as Error).message}`);
  }
}

/**
 * Sends a payment to a payee
 */
export async function sendPayment(
  paymentData: PaymentRequest,
  apiSecret = PAYMAN_API_SECRET
): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${PAYMAN_API_BASE_URL}/payments/send-payment`, {
      method: 'POST',
      headers: {
        'x-payman-api-secret': apiSecret,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new contractAiError(
        `Failed to send payment: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new contractAiError(`Error sending payment: ${(error as Error).message}`);
  }
}

export async function searchPayees(
  options?: SearchPayeesOptions,
  apiSecret = PAYMAN_API_SECRET
): Promise<SearchPayeesResponse> {
  try {
    const url = new URL(`${PAYMAN_API_BASE_URL}/payees/search-payees`);

    if (options) {
      if (options.name) url.searchParams.append('name', options.name);
      if (options.type) url.searchParams.append('type', options.type);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-payman-api-secret': apiSecret,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new contractAiError(
        `Failed to search payees: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new contractAiError(`Error searching payees: ${(error as Error).message}`);
  }
}
