const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers && typeof options.headers === 'object') {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
};

export const authAPI = {
  register: async (data: any) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: async (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: async () =>
    apiCall('/auth/logout', { method: 'POST' }),
};

export const userAPI = {
  getProfile: async () => apiCall('/users/profile'),

  updateProfile: async (data: any) =>
    apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAllUsers: async () => apiCall('/users'),

  updateUserRole: async (userId: string, role: string) =>
    apiCall(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }),
};

export const taskAPI = {
  create: async (data: any) =>
    apiCall('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getTasks: async (status?: string, priority?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    return apiCall(`/tasks?${params.toString()}`);
  },

  getById: async (id: string) => apiCall(`/tasks/${id}`),

  update: async (id: string, data: any) =>
    apiCall(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: async (id: string) =>
    apiCall(`/tasks/${id}`, { method: 'DELETE' }),
};
