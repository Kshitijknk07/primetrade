import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { taskAPI } from '@/lib/api';
import { Task, TaskFormData } from '@/types/task';

const INITIAL_FORM_DATA: TaskFormData = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskFormData>(INITIAL_FORM_DATA);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response: any = await taskAPI.getTasks();
      setTasks(response.data || []);
      toast.success('Tasks loaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await taskAPI.update(editingId, formData);
        toast.success('Task updated successfully');
      } else {
        await taskAPI.create(formData);
        toast.success('Task created successfully');
      }
      fetchTasks();
      resetForm();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save task');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      await taskAPI.delete(id);
      toast.success('Task deleted successfully');
      fetchTasks();
      setSelectedTasks(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete task');
    }
  };

  const handleBulkDelete = async (taskIds: Set<string>) => {
    if (taskIds.size === 0) {
      toast.error('No tasks selected');
      return;
    }
    if (!confirm(`Delete ${taskIds.size} task(s)?`)) return;

    try {
      await Promise.all(Array.from(taskIds).map(id => taskAPI.delete(id)));
      toast.success(`Deleted ${taskIds.size} task(s)`);
      fetchTasks();
      setSelectedTasks(new Set());
    } catch (err: any) {
      toast.error('Failed to delete tasks');
    }
  };

  const handleBulkStatusChange = async (taskIds: Set<string>, newStatus: string) => {
    if (taskIds.size === 0) {
      toast.error('No tasks selected');
      return;
    }
    try {
      await Promise.all(
        Array.from(taskIds).map(id => taskAPI.update(id, { status: newStatus }))
      );
      toast.success(`Updated ${taskIds.size} task(s)`);
      fetchTasks();
      setSelectedTasks(new Set());
    } catch (err: any) {
      toast.error('Failed to update tasks');
    }
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    });
    setEditingId(task.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingId(null);
    setShowForm(false);
  };

  const toggleTaskSelection = (id: string) => {
    setSelectedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return {
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
  };
};
