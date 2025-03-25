import { Skill, SkillDB } from "./types";

/**
 * Maps a database skill row to the application Skill type
 */
export function mapToSkill(dbRow: SkillDB): Skill {
  return {
    skillId: dbRow.skill_id,
    skillName: dbRow.skill_name
  };
}