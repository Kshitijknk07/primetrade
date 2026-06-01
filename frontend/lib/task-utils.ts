import { Task, TaskFiltersState } from '@/types/task';

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const filterTasks = (
  tasks: Task[],
  filters: TaskFiltersState
): Task[] => {
  return tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesStatus =
      filters.statusFilter === 'all' || task.status === filters.statusFilter;
    const matchesPriority =
      filters.priorityFilter === 'all' ||
      task.priority === filters.priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};

export const formatStatusLabel = (status: string): string => {
  return status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1);
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};
