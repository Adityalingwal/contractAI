import { pool } from '../../dbClient';
import { Contractor, ContractorDB, ContractAssignment } from './types';
import { mapToContractor } from './utils';

export async function upsertContractor(contractor: Contractor): Promise<Contractor> {
  const query = contractor.contractorId
    ? `UPDATE contractors SET 
        full_name = $1, 
        email = $2, 
        professional_title = $3, 
        bio = $4, 
        experience_level = $5, 
        hourly_rate = $6, 
        skills = $7, 
        portfolio_link = $8, 
        availability = $9, 
        available_from = $10,
        linkedin_profile = $11
      WHERE contractor_id = $12 
      RETURNING *`
    : `INSERT INTO contractors 
        (full_name, email, professional_title, bio, experience_level, hourly_rate, skills, 
         portfolio_link, availability, available_from, linkedin_profile)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`;

  const values = [
    contractor.fullName,
    contractor.email,
    contractor.professionalTitle,
    contractor.bio,
    contractor.experienceLevel,
    contractor.hourlyRate,
    contractor.skills,
    contractor.portfolioLink || null,
    contractor.availability,
    contractor.availableFrom,
    contractor.linkedinProfile || null,
  ];

  if (contractor.contractorId) {
    values.push(contractor.contractorId);
  }

  const result = await pool.query(query, values);
  return mapToContractor(result.rows[0]);
}

export async function fetchContractorById(id: number): Promise<Contractor | undefined> {
  const result = await pool.query(
    'SELECT * FROM contractors WHERE contractor_id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractor(result.rows[0]);
}

export async function fetchContractorByEmail(email: string): Promise<Contractor | undefined> {
  const result = await pool.query('SELECT * FROM contractors WHERE email = $1', [
    email,
  ]);

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractor(result.rows[0]);
}

export async function fetchAllContractors(): Promise<Contractor[]> {
  const result = await pool.query('SELECT * FROM contractors');
  return result.rows.map(mapToContractor);
}

export async function deleteContractor(id: number): Promise<void> {
  await pool.query('DELETE FROM contractors WHERE contractor_id = $1', [id]);
}

export async function assignContractToContractor(gigId: string, contractorId: string): Promise<ContractAssignment> {
  await pool.query(
    'UPDATE gigs SET status = $1 WHERE gig_id = $2',
    ['assigned', gigId]
  );
  
  const result = await pool.query(
    `INSERT INTO gig_assignments
      (gig_id, contractor_id, assigned_at, status)
     VALUES
      ($1, $2, CURRENT_TIMESTAMP, 'assigned')
     RETURNING *`,
    [gigId, contractorId]
  );
  
  return {
    assignmentId: result.rows[0].assignment_id,
    gigId: result.rows[0].gig_id,
    contractorId: result.rows[0].contractor_id,
    assignedAt: result.rows[0].assigned_at,
    status: result.rows[0].status,
    completedAt: result.rows[0].completed_at,
  };
}

export async function getAssignmentsByContractorId(contractorId: string): Promise<ContractAssignment[]> {
  const result = await pool.query(
    'SELECT * FROM gig_assignments WHERE contractor_id = $1',
    [contractorId]
  );
  
  return result.rows.map((row:any) => ({
    assignmentId: row.assignment_id,
    gigId: row.gig_id,
    contractorId: row.contractor_id,
    assignedAt: row.assigned_at,
    status: row.status,
    completedAt: row.completed_at,
  }));
}

export async function getAssignmentsByGigId(gigId: string): Promise<ContractAssignment[]> {
  const result = await pool.query(
    'SELECT * FROM gig_assignments WHERE gig_id = $1',
    [gigId]
  );
  
  return result.rows.map((row:any) => ({
    assignmentId: row.assignment_id,
    gigId: row.gig_id,
    contractorId: row.contractor_id,
    assignedAt: row.assigned_at,
    status: row.status,
    completedAt: row.completed_at,
  }));
}
