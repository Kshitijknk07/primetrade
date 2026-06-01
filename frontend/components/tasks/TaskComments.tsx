'use client';

import { Comment } from '@/types/task';
import { formatDate } from '@/lib/task-utils';

interface TaskCommentsProps {
  taskId: string;
  comments: Comment[] | undefined;
  commentText: string;
  loading: boolean;
  onCommentTextChange: (text: string) => void;
  onAddComment: (taskId: string) => void;
  onDeleteComment: (commentId: string, taskId: string) => void;
  onFetchComments: (taskId: string) => void;
}

export const TaskComments = ({
  taskId,
  comments,
  commentText,
  loading,
  onCommentTextChange,
  onAddComment,
  onDeleteComment,
  onFetchComments,
}: TaskCommentsProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-slate-900">Comments</h4>

      {/* Comments List */}
      {!loading && comments ? (
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-500">No comments yet</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-white p-3 rounded-lg text-sm">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="text-xs text-slate-500">
                    {formatDate(comment.createdAt)}
                  </span>
                  <button
                    onClick={() => onDeleteComment(comment.id, taskId)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-slate-700">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-500 mb-4">Loading comments...</p>
      )}

      {/* Add Comment */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => onCommentTextChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onAddComment(taskId);
            }
          }}
          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (!comments) {
              onFetchComments(taskId).then(() => onAddComment(taskId));
            } else {
              onAddComment(taskId);
            }
          }}
          className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};
