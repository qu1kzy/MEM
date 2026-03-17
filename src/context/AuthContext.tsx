import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
