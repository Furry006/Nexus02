export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar?: string | null;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string | null;
  ownerId: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  result?: T;
  error?: any;
}
