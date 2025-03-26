import fetch from 'node-fetch';
import { contractAiError } from '../../error/contractAiError';
import { PayeeCreationRequest, PayeeResponse, PaymentRequest, PaymentResponse, SearchPayeesOptions, SearchPayeesResponse } from './types';

const PAYMAN_API_SECRET = "YWd0LTFmMDBhMWM2LWQzN2UtNmE1OS05Y2UzLWZmN2NhN2M0ODI5MjpMU1ZkblNjVjRSekViU2FHMUE1TlJXd0hnOA=="
const PAYMAN_API_BASE_URL = 'https://agent.payman.ai/api';

export class PaymanService {
  private apiSecret: string;
  private baseUrl: string;

  constructor(apiSecret = PAYMAN_API_SECRET, baseUrl = PAYMAN_API_BASE_URL) {
    this.apiSecret = apiSecret;
    this.baseUrl = baseUrl;
  }

  async createPayee(payeeData: PayeeCreationRequest): Promise<PayeeResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payees/create-payee`, {
        method: 'POST',
        headers: {
          'x-payman-api-secret': this.apiSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payeeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new contractAiError(`Failed to create payee: ${errorData.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof contractAiError) {
        throw error;
      }
      throw new contractAiError(`Error creating payee: ${(error as Error).message}`);
    }
  }

 
  async sendPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/send-payment`, {
        method: 'POST',
        headers: {
          'x-payman-api-secret': this.apiSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new contractAiError(`Failed to send payment: ${errorData.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof contractAiError) {
        throw error;
      }
      throw new contractAiError(`Error sending payment: ${(error as Error).message}`);
    }
  }


  async searchPayees(options?: SearchPayeesOptions): Promise<SearchPayeesResponse> {
    try {
      const url = new URL(`${this.baseUrl}/payees/search-payees`);
      
      // Add query parameters if options provided
      if (options) {
        if (options.name) url.searchParams.append('name', options.name);
        if (options.type) url.searchParams.append('type', options.type);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'x-payman-api-secret': this.apiSecret,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new contractAiError(`Failed to search payees: ${errorData.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof contractAiError) {
        throw error;
      }
      throw new contractAiError(`Error searching payees: ${(error as Error).message}`);
    }
  }
}

export const paymanService = new PaymanService();