export interface PayeeCreationRequest {
    type: 'US_ACH' | 'TEST_RAILS';
    name: string;
    accountHolderName?: string;
    accountHolderType?: 'individual' | 'company';
    accountNumber?: string;
    routingNumber?: string;
    accountType?: 'checking' | 'savings';
    contactDetails?: {
      email?: string;
      phone?: string;
    };
    tags?: string[];
  }
  
  export interface PayeeResponse {
    id: string;
    type: string;
    name: string;
    createdAt: string;
    tags?: string[];
  }
  
  export interface PaymentRequest {
    amountDecimal: number;
    payeeId: string;
    memo?: string;
    metadata?: Record<string, any>;
  }
  
  export interface PaymentResponse {
    id: string;
    status: string;
    amountDecimal: number;
    payeeId: string;
    memo?: string;
    metadata?: Record<string, any>;
    createdAt: string;
  }
  
  export interface SearchPayeesOptions {
    name?: string;
    type?: string;
  }
  
  export interface SearchPayeesResponse {
    payees: PayeeResponse[];
  }