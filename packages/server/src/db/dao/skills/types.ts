// Define the Skill type for application use
export interface Skill {
    skillId?: string;
    skillName: string;
  }
  
  // Define the database response type (snake_case)
  export interface SkillDB {
    skill_id: string;
    skill_name: string;
  }