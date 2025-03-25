import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import {
  getAllSkills,
  getSkillById,
  getSkillByName,
  createOrUpdateSkill,
  removeSkill
} from '../services/skill-service/skillService';
import {
  GetSkillRequest,
  GetSkillResponse,
  GetSkillByNameRequest,
  UpsertSkillRequest,
  UpsertSkillResponse,
  DeleteSkillRequest,
  DeleteSkillResponse,
  GetAllSkillsResponse
} from '../api-types/apiTypes';

const skillRouter = Router();

async function getAllSkillsHandler(): Promise<GetAllSkillsResponse> {
  const skills = await getAllSkills();
  return { skills };
}

async function getSkillHandler(req: GetSkillRequest): Promise<GetSkillResponse> {
  const { skillId } = req;
  if (!skillId) {
    throw new contractAiError('skillId is required');
  }
  
  const skill = await getSkillById(skillId);
  return { skill };
}

async function getSkillByNameHandler(req: GetSkillByNameRequest): Promise<GetSkillResponse> {
  const { name } = req;
  if (!name) {
    throw new contractAiError('skill name is required');
  }
  
  const skill = await getSkillByName(name);
  if (!skill) {
    throw new contractAiError(`Skill with name ${name} not found`);
  }
  
  return { skill };
}

async function upsertSkillHandler(req: UpsertSkillRequest): Promise<UpsertSkillResponse> {
  const { skill } = req;
  if (!skill) {
    throw new contractAiError('skill data is required');
  }
  
  const updatedSkill = await createOrUpdateSkill(skill);
  return { skill: updatedSkill };
}

async function deleteSkillHandler(req: DeleteSkillRequest): Promise<DeleteSkillResponse> {
  const { skillId } = req;
  if (!skillId) {
    throw new contractAiError('skillId is required');
  }
  
  await removeSkill(skillId);
  return { success: true };
}

export const skillRouterConfig: RouteConfig = {
  router: skillRouter,
  endpoints: {
    '/getAllSkills': {
      handler: getAllSkillsHandler,
      isUserScoped: false,
    },
    '/getSkill': {
      handler: getSkillHandler,
      isUserScoped: false,
    },
    '/getSkillByName': {
      handler: getSkillByNameHandler,
      isUserScoped: false,
    },
    '/upsertSkill': {
      handler: upsertSkillHandler,
      isUserScoped: false,
    },
    '/deleteSkill': {
      handler: deleteSkillHandler,
      isUserScoped: false,
    }
  }
};