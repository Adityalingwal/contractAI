import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import {
  getContractorSkills,
  getContractorsWithSkill,
  addSkill,
  removeSkill,
  checkSkill,
  addMultipleSkills,
  removeAllSkills
} from '../services/contractor-skill-service/contractorSkillService';
import {
  GetContractorSkillsRequest,
  GetContractorSkillsResponse,
  GetContractorsWithSkillRequest,
  GetContractorsWithSkillResponse,
  AddSkillRequest,
  AddSkillResponse,
  RemoveSkillRequest,
  RemoveSkillResponse,
  CheckSkillRequest,
  CheckSkillResponse,
  AddMultipleSkillsRequest,
  AddMultipleSkillsResponse,
  RemoveAllSkillsRequest,
  RemoveAllSkillsResponse
} from '../api-types/apiTypes';

const contractorSkillRouter = Router();

async function getContractorSkillsHandler(req: GetContractorSkillsRequest): Promise<GetContractorSkillsResponse> {
  const { contractorId } = req;
  if (!contractorId) {
    throw new contractAiError('contractorId is required');
  }
  
  const skills = await getContractorSkills(contractorId);
  return { skills };
}

async function getContractorsWithSkillHandler(req: GetContractorsWithSkillRequest): Promise<GetContractorsWithSkillResponse> {
  const { skillId } = req;
  if (!skillId) {
    throw new contractAiError('skillId is required');
  }
  
  const contractorIds = await getContractorsWithSkill(skillId);
  return { contractorIds };
}

async function addSkillHandler(req: AddSkillRequest): Promise<AddSkillResponse> {
  const { contractorId, skillId } = req;
  if (!contractorId || !skillId) {
    throw new contractAiError('contractorId and skillId are required');
  }
  
  await addSkill(contractorId, skillId);
  return { success: true };
}

async function removeSkillHandler(req: RemoveSkillRequest): Promise<RemoveSkillResponse> {
  const { contractorId, skillId } = req;
  if (!contractorId || !skillId) {
    throw new contractAiError('contractorId and skillId are required');
  }
  
  await removeSkill(contractorId, skillId);
  return { success: true };
}

async function checkSkillHandler(req: CheckSkillRequest): Promise<CheckSkillResponse> {
  const { contractorId, skillId } = req;
  if (!contractorId || !skillId) {
    throw new contractAiError('contractorId and skillId are required');
  }
  
  const hasSkill = await checkSkill(contractorId, skillId);
  return { hasSkill };
}

async function addMultipleSkillsHandler(req: AddMultipleSkillsRequest): Promise<AddMultipleSkillsResponse> {
  const { contractorId, skillIds } = req;
  if (!contractorId || !skillIds || !skillIds.length) {
    throw new contractAiError('contractorId and skillIds are required');
  }
  
  await addMultipleSkills(contractorId, skillIds);
  return { success: true };
}

async function removeAllSkillsHandler(req: RemoveAllSkillsRequest): Promise<RemoveAllSkillsResponse> {
  const { contractorId } = req;
  if (!contractorId) {
    throw new contractAiError('contractorId is required');
  }
  
  await removeAllSkills(contractorId);
  return { success: true };
}

export const contractorSkillRouterConfig: RouteConfig = {
  router: contractorSkillRouter,
  endpoints: {
    '/getContractorSkills': {
      handler: getContractorSkillsHandler,
      isUserScoped: false,
    },
    '/getContractorsWithSkill': {
      handler: getContractorsWithSkillHandler,
      isUserScoped: false,
    },
    '/addSkill': {
      handler: addSkillHandler,
      isUserScoped: false,
    },
    '/removeSkill': {
      handler: removeSkillHandler,
      isUserScoped: false,
    },
    '/checkSkill': {
      handler: checkSkillHandler,
      isUserScoped: false,
    },
    '/addMultipleSkills': {
      handler: addMultipleSkillsHandler,
      isUserScoped: false,
    },
    '/removeAllSkills': {
      handler: removeAllSkillsHandler,
      isUserScoped: false,
    }
  }
};