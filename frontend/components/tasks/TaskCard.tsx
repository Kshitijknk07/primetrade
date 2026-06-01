'use client';

import { Task } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { getStatusColor, getPriorityColor, formatStatusLabel, formatDate } from '@/lib/task-utils';
import { TaskComments } from './TaskComments';
import { Comment } from '@/types/task';

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  isExpanded: boolean;
  comments?: Comment[];
  commentText: string;
  loadingComments: boolean;
  onSelect: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onExpand: () => void;
  onCommentTextChange: (text: string) => void;
  onAddComment: (taskId: string) => void;
  onDeleteComment: (commentId: string, taskId: string) => void;
  onFetchComments: (taskId: string) => void;
}

export const TaskCard = ({
  task,
  isSelected,
  isExpanded,
  comments,
  commentText,
  loadingComments,
  onSelect,
  onEdit,
  onDelete,
  onExpand,
  onCommentTextChange,
  onAddComment,
  onDeleteComment,
  onFetchComments,
}: TaskCardProps) => {
  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition overflow-hidden">
      {/* Task Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Checkbox checked={isSelected} onCheckedChange={() => onSelect(task.id)} />

          <div
            className="flex-1 cursor-pointer"
            onClick={onExpand}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-slate-600 mb-3">{task.description}</p>
            )}
            <div className="flex gap-2 flex-wrap">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {formatStatusLabel(task.status)}
              </span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              {task.dueDate && (
                <span className="text-xs text-slate-500 px-3 py-1">
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-slate-50 p-6">
          <TaskComments
            taskId={task.id}
            comments={comments}
            commentText={commentText}
            loading={loadingComments}
            onCommentTextChange={onCommentTextChange}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
            onFetchComments={onFetchComments}
          />
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={onExpand}
        className="w-full px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-medium border-t border-slate-200 bg-white hover:bg-slate-50 transition"
      >
        {isExpanded ? '▼ Hide Comments' : '▶ Show Comments'}
      </button>
    </div>
  );
};
