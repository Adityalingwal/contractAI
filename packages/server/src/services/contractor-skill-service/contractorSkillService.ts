import { 
    fetchSkillsByContractorId, 
    fetchContractorsBySkillId, 
    addSkillToContractor, 
    removeSkillFromContractor, 
    hasSkill, 
    addMultipleSkillsToContractor,
    removeAllSkillsFromContractor
  } from '../../db/dao/contractorSkills/contractorSkillsDao';
  import { ContractorSkillWithName } from '../../db/dao/contractorSkills/types';
  import { contractAiError } from '../../error/contractAiError';
  
  /**
   * Get all skills for a contractor
   */
  export async function getContractorSkills(contractorId: string): Promise<ContractorSkillWithName[]> {
    return fetchSkillsByContractorId(Number(contractorId));
  }
  
  /**
   * Get all contractors with a specific skill
   */
  export async function getContractorsWithSkill(skillId: string): Promise<number[]> {
    return fetchContractorsBySkillId(Number(skillId));
  }
  
  /**
   * Add a skill to a contractor
   */
  export async function addSkill(contractorId: string, skillId: string): Promise<void> {
    const result = await addSkillToContractor(Number(contractorId), Number(skillId));
    if (!result) {
      throw new contractAiError(`Failed to add skill ${skillId} to contractor ${contractorId}`);
    }
  }
  
  /**
   * Remove a skill from a contractor
   */
  export async function removeSkill(contractorId: string, skillId: string): Promise<void> {
    await removeSkillFromContractor(Number(contractorId), Number(skillId));
  }
  
  /**
   * Check if a contractor has a specific skill
   */
  export async function checkSkill(contractorId: string, skillId: string): Promise<boolean> {
    return hasSkill(Number(contractorId), Number(skillId));
  }
  
  /**
   * Add multiple skills to a contractor
   */
  export async function addMultipleSkills(contractorId: string, skillIds: string[]): Promise<void> {
    await addMultipleSkillsToContractor(
      Number(contractorId), 
      skillIds.map(id => Number(id))
    );
  }
  
  /**
   * Remove all skills from a contractor
   */
  export async function removeAllSkills(contractorId: string): Promise<void> {
    await removeAllSkillsFromContractor(Number(contractorId));
  }