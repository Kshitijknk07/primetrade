'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useTaskComments } from '@/hooks/useTaskComments';
import { filterTasks } from '@/lib/task-utils';
import { TaskFiltersState } from '@/types/task';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { BulkActions } from '@/components/tasks/BulkActions';
import { TaskList } from '@/components/tasks/TaskList';

export default function DashboardPage() {
  const {
    tasks,
    loading,
    showForm,
    setShowForm,
    editingId,
    formData,
    setFormData,
    selectedTasks,
    setSelectedTasks,
    fetchTasks,
    handleSubmit,
    handleDelete,
    handleBulkDelete,
    handleBulkStatusChange,
    handleEdit,
    resetForm,
    toggleTaskSelection,
  } = useTasks();

  const {
    comments,
    commentText,
    setCommentText,
    loadingComments,
    fetchComments,
    addComment,
    deleteComment,
  } = useTaskComments();

  const [filters, setFilters] = useState<TaskFiltersState>({
    searchTerm: '',
    statusFilter: 'all',
    priorityFilter: 'all',
  });

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const filteredTasks = filterTasks(tasks, filters);

  const toggleSelectAll = () => {
    if (selectedTasks.size === filteredTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredTasks.map(t => t.id)));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {/* Task Form */}
      {showForm && (
        <TaskForm
          data={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onSearchChange={(term) => setFilters({ ...filters, searchTerm: term })}
        onStatusChange={(status) => setFilters({ ...filters, statusFilter: status })}
        onPriorityChange={(priority) => setFilters({ ...filters, priorityFilter: priority })}
        taskCount={filteredTasks.length}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedTasks.size}
        onStatusChange={(status) => handleBulkStatusChange(selectedTasks, status)}
        onDelete={() => handleBulkDelete(selectedTasks)}
        onClear={() => setSelectedTasks(new Set())}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        selectedTaskIds={selectedTasks}
        expandedTaskId={expandedTaskId}
        comments={comments}
        commentTexts={commentText}
        loadingComments={loadingComments}
        onSelectTask={toggleTaskSelection}
        onSelectAll={toggleSelectAll}
        onEditTask={handleEdit}
        onDeleteTask={handleDelete}
        onExpandTask={(id) => setExpandedTaskId(expandedTaskId === id ? null : id)}
        onCommentTextChange={(taskId, text) =>
          setCommentText(prev => ({ ...prev, [taskId]: text }))
        }
        onAddComment={addComment}
        onDeleteComment={deleteComment}
        onFetchComments={fetchComments}
        loading={loading}
        isEmpty={filteredTasks.length === 0}
      />
    </div>
  );
}
