export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}

export interface TaskFiltersState {
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
}
