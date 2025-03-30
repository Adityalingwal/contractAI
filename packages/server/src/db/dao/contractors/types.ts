export interface Contractor {
  contractorId?: string; 
  fullName: string;
  email: string;
  professionalTitle: string;
  bio: string;
  experienceLevel: 'entry' | 'intermediate' | 'expert';
  hourlyRate: number;
  skills: string;
  portfolioLink?: string;
  availability: 'fullTime' | 'partTime' | 'limited';
  availableFrom: Date;
  linkedinProfile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContractorDB {
  contractor_id: string;
  full_name: string;
  email: string;
  professional_title: string;
  bio: string;
  experience_level: 'entry' | 'intermediate' | 'expert';
  hourly_rate: number;
  skills: string;
  portfolio_link?: string;
  availability: 'fullTime' | 'partTime' | 'limited';
  available_from: Date;
  linkedin_profile?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ContractAssignment {
  assignmentId?: string;
  gigId: string;
  contractorId: string;
  assignedAt?: Date;
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  completedAt?: Date;
  projectLink?: string;
}