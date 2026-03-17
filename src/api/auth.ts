import { apiClient } from './client';
import type { User } from '@/context/AuthContext';

interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return apiClient<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  return apiClient<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>('/api/auth/forgot', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
