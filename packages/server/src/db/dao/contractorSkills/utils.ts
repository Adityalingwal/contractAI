import { ContractorSkill, ContractorSkillDB, ContractorSkillWithName, ContractorSkillWithNameDB } from "./types";

/**
 * Maps a database contractor_skill row to the application ContractorSkill type
 */
export function mapToContractorSkill(dbRow: ContractorSkillDB): ContractorSkill {
  return {
    contractorId: dbRow.contractor_id,
    skillId: dbRow.skill_id
  };
}

/**
 * Maps a joined query result to ContractorSkillWithName type
 */
export function mapToContractorSkillWithName(dbRow: ContractorSkillWithNameDB): ContractorSkillWithName {
  return {
    contractorId: dbRow.contractor_id,
    skillId: dbRow.skill_id,
    skillName: dbRow.skill_name
  };
}