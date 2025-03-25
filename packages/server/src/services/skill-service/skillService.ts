import { 
    fetchSkillById, 
    fetchSkillByName, 
    fetchAllSkills, 
    upsertSkill, 
    deleteSkill 
  } from '../../db/dao/skills/skillsDao';
  import { Skill } from '../../db/dao/skills/types';
  import { contractAiError } from '../../error/contractAiError';
  
  /**
   * Get skill by ID
   */
  export async function getSkillById(skillId: string): Promise<Skill> {
    const skill = await fetchSkillById(Number(skillId));
    if (!skill) {
      throw new contractAiError(`Skill with ID ${skillId} not found`);
    }
    return skill;
  }
  
  /**
   * Get skill by name
   */
  export async function getSkillByName(name: string): Promise<Skill | undefined> {
    return fetchSkillByName(name);
  }
  
  /**
   * Get all skills
   */
  export async function getAllSkills(): Promise<Skill[]> {
    return fetchAllSkills();
  }
  
  /**
   * Create or update a skill
   */
  export async function createOrUpdateSkill(skill: Skill): Promise<Skill> {
    return upsertSkill(skill);
  }
  
  /**
   * Remove a skill
   */
  export async function removeSkill(skillId: string): Promise<void> {
    await deleteSkill(Number(skillId));
  }