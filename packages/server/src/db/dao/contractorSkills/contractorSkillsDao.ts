import { pool } from '../../dbClient';
import {
  ContractorSkill,
  ContractorSkillDB,
  ContractorSkillWithName,
  ContractorSkillWithNameDB,
} from './types';
import { mapToContractorSkill, mapToContractorSkillWithName } from './utils';

// Add a skill to a contractor
export async function addSkillToContractor(
  contractorId: number,
  skillId: number
): Promise<ContractorSkill | undefined> {
  const result = await pool.query<ContractorSkillDB>(
    `INSERT INTO contractor_skills (contractor_id, skill_id)
       VALUES ($1, $2)
       RETURNING *`,
    [contractorId, skillId]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractorSkill(result.rows[0]);
}

// Remove a skill from a contractor
export async function removeSkillFromContractor(
  contractorId: number,
  skillId: number
): Promise<void> {
  await pool.query('DELETE FROM contractor_skills WHERE contractor_id = $1 AND skill_id = $2', [
    contractorId,
    skillId,
  ]);
}

// Get all skills for a contractor (with skill names)
export async function fetchSkillsByContractorId(
  contractorId: number
): Promise<ContractorSkillWithName[]> {
  const result = await pool.query<ContractorSkillWithNameDB>(
    `SELECT cs.contractor_id, cs.skill_id, s.skill_name
     FROM contractor_skills cs
     JOIN skills s ON cs.skill_id = s.skill_id
     WHERE cs.contractor_id = $1`,
    [contractorId]
  );

  return result.rows.map(mapToContractorSkillWithName);
}

// Get all contractors for a skill
export async function fetchContractorsBySkillId(skillId: number): Promise<number[]> {
  const result = await pool.query<{ contractor_id: number }>(
    'SELECT contractor_id FROM contractor_skills WHERE skill_id = $1',
    [skillId]
  );

  return result.rows.map(row => row.contractor_id);
}

// Check if a contractor has a specific skill
export async function hasSkill(contractorId: number, skillId: number): Promise<boolean> {
  const result = await pool.query(
    'SELECT 1 FROM contractor_skills WHERE contractor_id = $1 AND skill_id = $2',
    [contractorId, skillId]
  );

  return result.rows.length > 0;
}

// Remove all skills from a contractor
export async function removeAllSkillsFromContractor(contractorId: number): Promise<void> {
  await pool.query('DELETE FROM contractor_skills WHERE contractor_id = $1', [contractorId]);
}

// Add multiple skills to a contractor in one transaction
export async function addMultipleSkillsToContractor(
  contractorId: number,
  skillIds: number[]
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const skillId of skillIds) {
      await client.query(
        'INSERT INTO contractor_skills (contractor_id, skill_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [contractorId, skillId]
      );
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
