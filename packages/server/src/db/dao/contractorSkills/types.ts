// Define the ContractorSkill type for application use
export interface ContractorSkill {
    contractorId: string;
    skillId: string;
  }
  
  // Define the database response type (snake_case)
  export interface ContractorSkillDB {
    contractor_id: string;
    skill_id: string;
  }
  
  // Extended type with skill name for joined queries
  export interface ContractorSkillWithName extends ContractorSkill {
    skillName: string;
  }
  
  // Database response for joined queries
  export interface ContractorSkillWithNameDB {
    contractor_id: string;
    skill_id: string;
    skill_name: string;
  }