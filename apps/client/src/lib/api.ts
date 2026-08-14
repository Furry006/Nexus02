import axios from 'axios';
import type { User, Workspace } from '../types';

// Axios client with credentials for cookie-based authentication
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle unauthenticated 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Optional token refresh attempt or redirection handling
    }
    return Promise.reject(error);
  }
);

/* ================= AUTH API ================= */
export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  signUp: async (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post('/auth/signup', data);
    return res.data;
  },

  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post('/auth/refresh');
    return res.data;
  },
};

/* ================= USER API ================= */
export const userApi = {
  getMe: async (): Promise<User | null> => {
    try {
      const res = await api.get('/user/me');
      return res.data?.data || res.data?.result || res.data;
    } catch {
      return null;
    }
  },

  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    const res = await api.patch('/user/change-password', data);
    return res.data;
  },
};

/* ================= WORKSPACE API ================= */
export const workspaceApi = {
  getMyWorkspaces: async (): Promise<Workspace[]> => {
    try {
      const res = await api.get('/workspace/my');
      const data = res.data?.data || res.data?.result || res.data;
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  getWorkspaceById: async (workspaceId: string): Promise<Workspace | null> => {
    try {
      const res = await api.get(`/workspace/${workspaceId}`);
      return res.data?.data || res.data?.result || res.data;
    } catch {
      return null;
    }
  },

  createWorkspace: async (data: { name: string; description?: string }) => {
    const res = await api.post('/workspace/create', data);
    return res.data;
  },

  updateWorkspace: async (
    workspaceId: string,
    data: { name?: string; description?: string }
  ) => {
    const res = await api.patch(`/workspace/${workspaceId}/update`, data);
    return res.data;
  },

  deleteWorkspace: async (workspaceId: string) => {
    const res = await api.delete(`/workspace/${workspaceId}/delete`);
    return res.data;
  },

  joinWorkspace: async (workspaceId: string, inviteCode: string) => {
    const res = await api.post(`/workspace/join/${workspaceId}`, { inviteCode });
    return res.data;
  },

  leaveWorkspace: async (workspaceId: string) => {
    const res = await api.post(`/workspace/leave/${workspaceId}`);
    return res.data;
  },
};
