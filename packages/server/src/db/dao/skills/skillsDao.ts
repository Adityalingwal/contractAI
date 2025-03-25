import { pool } from "../../dbClient";
import { Skill, SkillDB } from "./types";
import { mapToSkill } from "./utils";

// Upsert a skill (create or update)
export async function upsertSkill(
  skill: Skill
): Promise<Skill> {
  const query = skill.skillId
    ? `UPDATE skills SET 
        skill_name = $1
      WHERE skill_id = $2 
      RETURNING *`
    : `INSERT INTO skills 
        (skill_name)
      VALUES 
        ($1)
      RETURNING *`;

  const values = [skill.skillName];
  
  if (skill.skillId) {
    values.push(skill.skillId);
  }
  
  const result = await pool.query<SkillDB>(query, values);
  return mapToSkill(result.rows[0]);
}

// Fetch skill by ID
export async function fetchSkillById(id: number): Promise<Skill | undefined> {
  const result = await pool.query<SkillDB>(
    'SELECT * FROM skills WHERE skill_id = $1',
    [id]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToSkill(result.rows[0]);
}

// Fetch skill by name
export async function fetchSkillByName(name: string): Promise<Skill | undefined> {
  const result = await pool.query<SkillDB>(
    'SELECT * FROM skills WHERE skill_name = $1',
    [name]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToSkill(result.rows[0]);
}

// Fetch all skills
export async function fetchAllSkills(): Promise<Skill[]> {
  const result = await pool.query<SkillDB>('SELECT * FROM skills');
  return result.rows.map(mapToSkill);
}

// Delete skill
export async function deleteSkill(id: number): Promise<void> {
  await pool.query('DELETE FROM skills WHERE skill_id = $1', [id]);
}