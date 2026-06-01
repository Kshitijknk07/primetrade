'use client';

import { Task, Comment } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  selectedTaskIds: Set<string>;
  expandedTaskId: string | null;
  comments: Record<string, Comment[]>;
  commentTexts: Record<string, string>;
  loadingComments: Set<string>;
  onSelectTask: (id: string) => void;
  onSelectAll: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onExpandTask: (id: string) => void;
  onCommentTextChange: (taskId: string, text: string) => void;
  onAddComment: (taskId: string) => void;
  onDeleteComment: (commentId: string, taskId: string) => void;
  onFetchComments: (taskId: string) => void;
  loading: boolean;
  isEmpty: boolean;
}

export const TaskList = ({
  tasks,
  selectedTaskIds,
  expandedTaskId,
  comments,
  commentTexts,
  loadingComments,
  onSelectTask,
  onSelectAll,
  onEditTask,
  onDeleteTask,
  onExpandTask,
  onCommentTextChange,
  onAddComment,
  onDeleteComment,
  onFetchComments,
  loading,
  isEmpty,
}: TaskListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading tasks...</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
        <p className="text-slate-600">
          No tasks match your filters
        </p>
      </div>
    );
  }

  const isAllSelected =
    selectedTaskIds.size === tasks.length && tasks.length > 0;

  return (
    <div className="space-y-4">
      {/* Select All */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm text-slate-700 font-medium">
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </span>
      </div>

      {/* Task Cards */}
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          isSelected={selectedTaskIds.has(task.id)}
          isExpanded={expandedTaskId === task.id}
          comments={comments[task.id]}
          commentText={commentTexts[task.id] || ''}
          loadingComments={loadingComments.has(task.id)}
          onSelect={onSelectTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onExpand={() => {
            onExpandTask(task.id);
            if (expandedTaskId !== task.id && !comments[task.id]) {
              onFetchComments(task.id);
            }
          }}
          onCommentTextChange={(text) => onCommentTextChange(task.id, text)}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          onFetchComments={onFetchComments}
        />
      ))}
    </div>
  );
};
