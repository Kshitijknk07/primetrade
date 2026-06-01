'use client';

import { TaskFiltersState } from '@/types/task';

interface TaskFiltersProps {
  filters: TaskFiltersState;
  onSearchChange: (term: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  taskCount: number;
}

export const TaskFilters = ({
  filters,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  taskCount,
}: TaskFiltersProps) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg border border-slate-200 space-y-4">
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={filters.searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Status Filter
          </label>
          <select
            value={filters.statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Priority Filter
          </label>
          <select
            value={filters.priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-slate-600">
            {taskCount} task{taskCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};
