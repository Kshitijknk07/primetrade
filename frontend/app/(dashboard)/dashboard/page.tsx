'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { filterTasks } from '@/lib/task-utils';
import { TaskFiltersState } from '@/types/task';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const {
    tasks,
    loading,
    showForm,
    setShowForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
  } = useTasks();

  const [filters, setFilters] = useState<TaskFiltersState>({
    searchTerm: '',
    statusFilter: 'all',
    priorityFilter: 'all',
  });

  const filteredTasks = filterTasks(tasks, filters);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-slate-600 bg-slate-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
          <p className="text-sm text-slate-600 mt-1">{filteredTasks.length} task(s)</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="lg"
          className="bg-black hover:bg-slate-900 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel' : 'Add Task'}
        </Button>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <TaskForm
            data={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editingId}
          />
        </div>
      )}

      {/* Filters */}
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search tasks by title..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          className="h-10 bg-white border-slate-200"
        />

        <div className="flex gap-4">
          <select
            value={filters.statusFilter}
            onChange={(e) => setFilters({ ...filters, statusFilter: e.target.value })}
            className="flex-1 h-10 px-3 bg-white border border-slate-200 rounded-md text-sm"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={filters.priorityFilter}
            onChange={(e) => setFilters({ ...filters, priorityFilter: e.target.value })}
            className="flex-1 h-10 px-3 bg-white border border-slate-200 rounded-md text-sm"
          >
            {priorityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <Button
            onClick={() => setFilters({ searchTerm: '', statusFilter: 'all', priorityFilter: 'all' })}
            variant="outline"
            size="sm"
            className="px-4 h-10"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-600 text-sm font-medium">
            {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
          </p>
          <p className="text-slate-500 text-xs mt-1">
            {tasks.length === 0 ? 'Create your first task to get started' : 'Try adjusting your filters'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition flex items-start justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm truncate">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)} font-medium capitalize`}>
                    {task.status.replace('_', ' ')}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)} font-medium capitalize`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs px-2 py-1 rounded text-slate-600 bg-slate-100">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(task)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="w-4 h-4 text-slate-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-slate-600 text-sm">
          Loading tasks...
        </div>
      )}
    </div>
  );
}
