export interface ContractorProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: string;
  hourlyRate: number;
  availability: string;
  completedProjects: {
    projectName: string;
    clientName: string;
    completionDate: string;
    description: string;
    feedback: string;
  }[];
  professionalSummary: string;
}

export interface ProfileModalState {
  isOpen: boolean;
  contractor: ContractorProfile | null;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  relatedTo?: string;
}
