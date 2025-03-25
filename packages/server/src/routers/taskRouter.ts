import { Router } from 'express';
import { RouteConfig } from '../types';
import { contractAiError } from '../error/contractAiError';
import {
  getAllTasks,
  getTaskById,
  getTasksByCompanyId,
  getTasksByContractorId,
  createOrUpdateTask,
  assignTask,
  changeTaskStatus,
  removeTask
} from '../services/task-service/taskService';
import {
  GetTaskRequest,
  GetTaskResponse,
  GetTasksByCompanyRequest,
  GetTasksByCompanyResponse,
  GetTasksByContractorRequest,
  GetTasksByContractorResponse,
  UpsertTaskRequest,
  UpsertTaskResponse,
  AssignTaskRequest,
  AssignTaskResponse,
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetAllTasksResponse
} from '../api-types/apiTypes';

const taskRouter = Router();

async function getAllTasksHandler(): Promise<GetAllTasksResponse> {
  const tasks = await getAllTasks();
  return { tasks };
}

async function getTaskHandler(req: GetTaskRequest): Promise<GetTaskResponse> {
  const { taskId } = req;
  if (!taskId) {
    throw new contractAiError('taskId is required');
  }
  
  const task = await getTaskById(taskId);
  return { task };
}

async function getTasksByCompanyHandler(req: GetTasksByCompanyRequest): Promise<GetTasksByCompanyResponse> {
  const { companyId } = req;
  if (!companyId) {
    throw new contractAiError('companyId is required');
  }
  
  const tasks = await getTasksByCompanyId(companyId);
  return { tasks };
}

async function getTasksByContractorHandler(req: GetTasksByContractorRequest): Promise<GetTasksByContractorResponse> {
  const { contractorId } = req;
  if (!contractorId) {
    throw new contractAiError('contractorId is required');
  }
  
  const tasks = await getTasksByContractorId(contractorId);
  return { tasks };
}

async function upsertTaskHandler(req: UpsertTaskRequest): Promise<UpsertTaskResponse> {
  const { task } = req;
  if (!task) {
    throw new contractAiError('task data is required');
  }
  
  const updatedTask = await createOrUpdateTask(task);
  return { task: updatedTask };
}

async function assignTaskHandler(req: AssignTaskRequest): Promise<AssignTaskResponse> {
  const { taskId, contractorId } = req;
  if (!taskId || !contractorId) {
    throw new contractAiError('taskId and contractorId are required');
  }
  
  const task = await assignTask(taskId, contractorId);
  return { task };
}

async function updateTaskStatusHandler(req: UpdateTaskStatusRequest): Promise<UpdateTaskStatusResponse> {
  const { taskId, status } = req;
  if (!taskId || !status) {
    throw new contractAiError('taskId and status are required');
  }
  
  const task = await changeTaskStatus(taskId, status);
  return { task };
}

async function deleteTaskHandler(req: DeleteTaskRequest): Promise<DeleteTaskResponse> {
  const { taskId } = req;
  if (!taskId) {
    throw new contractAiError('taskId is required');
  }
  
  await removeTask(taskId);
  return { success: true };
}

export const taskRouterConfig: RouteConfig = {
  router: taskRouter,
  endpoints: {
    '/getAllTasks': {
      handler: getAllTasksHandler,
      isUserScoped: false,
    },
    '/getTask': {
      handler: getTaskHandler,
      isUserScoped: false,
    },
    '/getTasksByCompany': {
      handler: getTasksByCompanyHandler,
      isUserScoped: false,
    },
    '/getTasksByContractor': {
      handler: getTasksByContractorHandler,
      isUserScoped: false,
    },
    '/upsertTask': {
      handler: upsertTaskHandler,
      isUserScoped: false,
    },
    '/assignTask': {
      handler: assignTaskHandler,
      isUserScoped: false,
    },
    '/updateTaskStatus': {
      handler: updateTaskStatusHandler,
      isUserScoped: false,
    },
    '/deleteTask': {
      handler: deleteTaskHandler,
      isUserScoped: false,
    }
  }
};