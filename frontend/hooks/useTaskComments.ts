import { useState } from 'react';
import { toast } from 'sonner';
import { Comment } from '@/types/task';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const useTaskComments = () => {
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [loadingComments, setLoadingComments] = useState<Set<string>>(new Set());

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const fetchComments = async (taskId: string) => {
    try {
      const newLoading = new Set(loadingComments);
      newLoading.add(taskId);
      setLoadingComments(newLoading);

      const response = await fetch(`${API_URL}/comments/${taskId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }).then(r => r.json());

      setComments(prev => ({ ...prev, [taskId]: response.data || [] }));
    } catch (err: any) {
      toast.error('Failed to load comments');
    } finally {
      const newLoading = new Set(loadingComments);
      newLoading.delete(taskId);
      setLoadingComments(newLoading);
    }
  };

  const addComment = async (taskId: string) => {
    const content = commentText[taskId]?.trim();
    if (!content) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      await fetch(`${API_URL}/comments/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ content }),
      });

      setCommentText(prev => ({ ...prev, [taskId]: '' }));
      await fetchComments(taskId);
      toast.success('Comment added');
    } catch (err: any) {
      toast.error('Failed to add comment');
    }
  };

  const deleteComment = async (commentId: string, taskId: string) => {
    try {
      await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      await fetchComments(taskId);
      toast.success('Comment deleted');
    } catch (err: any) {
      toast.error('Failed to delete comment');
    }
  };

  return {
    comments,
    commentText,
    setCommentText,
    loadingComments,
    fetchComments,
    addComment,
    deleteComment,
  };
};
