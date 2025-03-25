import { 
    fetchTaskById, 
    fetchTasksByCompanyId, 
    fetchTasksByContractorId, 
    fetchAllTasks, 
    upsertTask, 
    deleteTask,
    assignTaskToContractor,
    updateTaskStatus
  } from '../../db/dao/tasks/tasksDao';
  import { Task, TaskStatus } from '../../db/dao/tasks/types';
  import { contractAiError } from '../../error/contractAiError';
  
  /**
   * Get task by ID
   */
  export async function getTaskById(taskId: string): Promise<Task> {
    const task = await fetchTaskById(Number(taskId));
    if (!task) {
      throw new contractAiError(`Task with ID ${taskId} not found`);
    }
    return task;
  }
  
  /**
   * Get tasks by company ID
   */
  export async function getTasksByCompanyId(companyId: string): Promise<Task[]> {
    return fetchTasksByCompanyId(Number(companyId));
  }
  
  /**
   * Get tasks by contractor ID
   */
  export async function getTasksByContractorId(contractorId: string): Promise<Task[]> {
    return fetchTasksByContractorId(Number(contractorId));
  }
  
  /**
   * Get all tasks
   */
  export async function getAllTasks(): Promise<Task[]> {
    return fetchAllTasks();
  }
  
  /**
   * Create or update a task
   */
  export async function createOrUpdateTask(task: Task): Promise<Task> {
    return upsertTask(task);
  }
  
  /**
   * Assign a task to a contractor
   */
  export async function assignTask(taskId: string, contractorId: string): Promise<Task> {
    const result = await assignTaskToContractor(Number(taskId), Number(contractorId));
    if (!result) {
      throw new contractAiError(`Failed to assign task ${taskId} to contractor ${contractorId}`);
    }
    return result;
  }
  
  /**
   * Update task status
   */
  export async function changeTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const result = await updateTaskStatus(Number(taskId), status);
    if (!result) {
      throw new contractAiError(`Failed to update status for task ${taskId}`);
    }
    return result;
  }
  
  /**
   * Remove a task
   */
  export async function removeTask(taskId: string): Promise<void> {
    await deleteTask(Number(taskId));
  }