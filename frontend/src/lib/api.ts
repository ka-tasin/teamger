
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.error || 'Something went wrong';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

// User API
export const userApi = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Team API
export const teamApi = {
  create: async (data: { name: string }) => {
    const response = await api.post('/teams', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/teams');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },
  addMember: async (data: { name: string; role: string; capacity: number; teamId: string }) => {
    const response = await api.post('/teams/members', data);
    return response.data;
  },
};

// Project API
export const projectApi = {
  create: async (data: { name: string; description?: string; teamId: string }) => {
    const response = await api.post('/projects', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getByTeam: async (teamId: string) => {
    const response = await api.get(`/projects/team/${teamId}`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
};

// Task API
export const taskApi = {
  create: async (data: {
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    projectId: string;
    assignedTo?: string;
  }) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },
  getAll: async (filters?: { projectId?: string; assignedTo?: string; status?: string; priority?: string }) => {
    const response = await api.get('/tasks', { params: filters });
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
  reassign: async (teamId: string) => {
    const response = await api.post(`/tasks/teams/${teamId}/reassign`);
    return response.data;
  },
  getTeamSummary: async (teamId: string) => {
    const response = await api.get(`/tasks/teams/${teamId}/summary`);
    return response.data;
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (teamId?: string) => {
    const url = teamId ? `/dashboard/stats/team/${teamId}` : '/dashboard/stats';
    const response = await api.get(url);
    return response.data;
  },
};