import { pool } from "../../dbClient";
import { Task, TaskDB, TaskStatus } from "./types";
import { mapToTask } from "./utils";

// Upsert a task (create or update)
export async function upsertTask(
  task: Task
): Promise<Task> {
  const query = task.taskId
    ? `UPDATE tasks SET 
        company_id = $1, 
        contractor_id = $2, 
        title = $3, 
        description = $4, 
        status = $5, 
        due_date = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE task_id = $7 
      RETURNING *`
    : `INSERT INTO tasks 
        (company_id, contractor_id, title, description, status, due_date)
      VALUES 
        ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

  const values = [
    task.companyId,
    task.contractorId || null,
    task.title,
    task.description || null,
    task.status || 'open',
    task.dueDate || null
  ];
  
  if (task.taskId) {
    values.push(task.taskId);
  }
  
  const result = await pool.query<TaskDB>(query, values);
  return mapToTask(result.rows[0]);
}

// Fetch task by ID
export async function fetchTaskById(id: number): Promise<Task | undefined> {
  const result = await pool.query<TaskDB>(
    'SELECT * FROM tasks WHERE task_id = $1',
    [id]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToTask(result.rows[0]);
}

// Fetch tasks by company ID
export async function fetchTasksByCompanyId(companyId: number): Promise<Task[]> {
  const result = await pool.query<TaskDB>(
    'SELECT * FROM tasks WHERE company_id = $1',
    [companyId]
  );
  
  return result.rows.map(mapToTask);
}

// Fetch tasks by contractor ID
export async function fetchTasksByContractorId(contractorId: number): Promise<Task[]> {
  const result = await pool.query<TaskDB>(
    'SELECT * FROM tasks WHERE contractor_id = $1',
    [contractorId]
  );
  
  return result.rows.map(mapToTask);
}

// Fetch all tasks
export async function fetchAllTasks(): Promise<Task[]> {
  const result = await pool.query<TaskDB>('SELECT * FROM tasks');
  return result.rows.map(mapToTask);
}

// Assign task to contractor
export async function assignTaskToContractor(taskId: number, contractorId: number): Promise<Task | undefined> {
  const result = await pool.query<TaskDB>(
    `UPDATE tasks 
     SET contractor_id = $1, status = 'assigned', updated_at = CURRENT_TIMESTAMP 
     WHERE task_id = $2 
     RETURNING *`,
    [contractorId, taskId]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToTask(result.rows[0]);
}

// Update task status
export async function updateTaskStatus(taskId: number, status: TaskStatus): Promise<Task | undefined> {
  const result = await pool.query<TaskDB>(
    'UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE task_id = $2 RETURNING *',
    [status, taskId]
  );
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  return mapToTask(result.rows[0]);
}

// Delete task
export async function deleteTask(id: number): Promise<void> {
  await pool.query('DELETE FROM tasks WHERE task_id = $1', [id]);
}