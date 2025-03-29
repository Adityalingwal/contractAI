export interface GigDB {
    gig_id: string;
    company_id: string;
    title: string;
    description: string;
    required_skills: string;
    experience_level: string;
    estimated_duration: string;
    hourly_rate: number;
    status: string;
    payment_method: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Gig {
    gigId?: string;
    companyId?: string;
    title: string;
    description: string;
    requiredSkills: string;
    experienceLevel: string;
    estimatedDuration: string;
    hourlyRate: number;
    status?: string;
    paymentMethod?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }