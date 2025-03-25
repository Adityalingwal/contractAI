import { Task, TaskDB } from "./types";

/**
 * Maps a database task row to the application Task type
 */
export function mapToTask(dbRow: TaskDB): Task {
  return {
    taskId: dbRow.task_id,
    companyId: dbRow.company_id,
    contractorId: dbRow.contractor_id || undefined,
    title: dbRow.title,
    description: dbRow.description || undefined,
    status: dbRow.status,
    dueDate: dbRow.due_date || undefined,
    createdAt: dbRow.created_at,
    updatedAt: dbRow.updated_at
  };
}