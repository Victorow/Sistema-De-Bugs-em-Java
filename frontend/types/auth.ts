// types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
