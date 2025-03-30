import { pool } from '../../dbClient';
import { Gig, GigDB } from './types';
import { mapToGig } from './utils';

export async function insertGig(gig: Gig): Promise<Gig> {
  const query = `
    INSERT INTO gigs 
      (title, description, required_skills, experience_level, 
       estimated_duration, hourly_rate)
    VALUES 
      ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  const values = [
    gig.title,
    gig.description,
    gig.requiredSkills,
    gig.experienceLevel,
    gig.estimatedDuration,
    gig.hourlyRate
  ];

  const result = await pool.query(query, values);
  return mapToGig(result.rows[0]);
}

export async function fetchGigById(id: string): Promise<Gig | undefined> {
  const result = await pool.query(
    'SELECT * FROM gigs WHERE gig_id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToGig(result.rows[0]);
}

export async function fetchAllGigs(): Promise<Gig[]> {
  const result = await pool.query('SELECT * FROM gigs');
  return result.rows.map(mapToGig);
}

export interface CompletedGigForPayment {
  assignmentId: string;
  gigId: string;
  contractorId: string;
  contractorName: string;
  payeeId: string;
  title: string;
  hourlyRate: string;
  completedAt: Date;
  projectLink: string;
  paymentStatus: string;
}

export async function fetchCompletedGigsForPayment(): Promise<CompletedGigForPayment[]> {
  const query = `
    SELECT 
      ga.assignment_id,
      ga.gig_id,
      ga.contractor_id,
      c.full_name as contractor_name,
      c.payee_id,
      g.title,
      g.hourly_rate,
      ga.completed_at,
      ga.project_link,
      ga.payment_status
    FROM 
      gig_assignments ga
    JOIN 
      gigs g ON ga.gig_id = g.gig_id
    JOIN 
      contractors c ON ga.contractor_id = c.contractor_id
    WHERE 
      ga.status = 'completed'
      AND ga.project_link IS NOT NULL
      AND ga.payment_status = 'unpaid'
      AND c.payee_id IS NOT NULL
    ORDER BY 
      ga.completed_at DESC
  `;

  const result = await pool.query(query);
  
  return result.rows.map((row: any) => ({
    assignmentId: row.assignment_id,
    gigId: row.gig_id,
    contractorId: row.contractor_id,
    contractorName: row.contractor_name,
    payeeId: row.payee_id,
    title: row.title,
    hourlyRate: row.hourly_rate,
    completedAt: row.completed_at,
    projectLink: row.project_link,
    paymentStatus: row.payment_status
  }));
}

export async function updateGigPaymentStatus(
  assignmentId: string, 
  paymentStatus: string,
  paymentId?: string
): Promise<void> {
  const query = `
    UPDATE gig_assignments
    SET 
      payment_status = $1,
      payment_id = $2,
      payment_sent_at = CURRENT_TIMESTAMP
    WHERE
      assignment_id = $3
  `;

  await pool.query(query, [paymentStatus, paymentId, assignmentId]);
}