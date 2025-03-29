import { Contractor, ContractorDB } from './types';

export function mapToContractor(dbContractor: ContractorDB): Contractor {
  return {
    contractorId: dbContractor.contractor_id,
    fullName: dbContractor.full_name,
    email: dbContractor.email,
    professionalTitle: dbContractor.professional_title,
    bio: dbContractor.bio,
    experienceLevel: dbContractor.experience_level,
    hourlyRate: Number(dbContractor.hourly_rate),
    skills: dbContractor.skills,
    portfolioLink: dbContractor.portfolio_link,
    availability: dbContractor.availability,
    availableFrom: dbContractor.available_from,
    linkedinProfile: dbContractor.linkedin_profile,
    createdAt: dbContractor.created_at,
    updatedAt: dbContractor.updated_at
  };
}