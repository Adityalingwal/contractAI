import { GigDB, Gig } from './types';

export function mapToGig(gigDB: GigDB): Gig {
  return {
    gigId: gigDB.gig_id,
    companyId: gigDB.company_id,
    title: gigDB.title,
    description: gigDB.description,
    requiredSkills: gigDB.required_skills,
    experienceLevel: gigDB.experience_level,
    estimatedDuration: gigDB.estimated_duration,
    hourlyRate: parseFloat(gigDB.hourly_rate.toString()),
    status: gigDB.status,
    paymentMethod: gigDB.payment_method,
    createdAt: gigDB.created_at,
    updatedAt: gigDB.updated_at
  };
}

export function mapToGigDB(gig: Gig): Partial<GigDB> {
  return {
    company_id: gig.companyId,
    title: gig.title,
    description: gig.description,
    required_skills: gig.requiredSkills,
    experience_level: gig.experienceLevel,
    estimated_duration: gig.estimatedDuration,
    hourly_rate: gig.hourlyRate,
    status: gig.status,
    payment_method: gig.paymentMethod
  };
}