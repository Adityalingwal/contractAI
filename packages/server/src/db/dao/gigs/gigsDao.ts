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

  const result = await pool.query<GigDB>(query, values);
  return mapToGig(result.rows[0]);
}

export async function fetchGigById(id: string): Promise<Gig | undefined> {
  const result = await pool.query<GigDB>(
    'SELECT * FROM gigs WHERE gig_id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToGig(result.rows[0]);
}

export async function fetchAllGigs(): Promise<Gig[]> {
  const result = await pool.query<GigDB>('SELECT * FROM gigs');
  return result.rows.map(mapToGig);
}