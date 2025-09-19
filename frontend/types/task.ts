// types/task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: Category;
  priority: Priority;
  status: Status;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  overdue: boolean;
}

export interface TaskRequest {
  title: string;
  description?: string;
  categoryId?: string;
  priority: Priority;
  status?: Status;
  dueDate?: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  category?: Category;
  priority: Priority;
  status: Status;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  overdue: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TaskStats {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  cancelledTasks: number;
  overdueTasks: number;
  inProgressTasks: number;
  completionRate: number;
}
