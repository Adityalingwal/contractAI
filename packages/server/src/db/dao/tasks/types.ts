// Task status enum
export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

// Define the Task type for application use
export interface Task {
  taskId?: string;
  companyId: number;
  contractorId?: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the database response type (snake_case)
export interface TaskDB {
  task_id: string;
  company_id: number;
  contractor_id: number | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date;
}