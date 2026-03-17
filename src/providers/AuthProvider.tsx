import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { AuthContext, type User } from '@/context/AuthContext';
import * as authApi from '@/api/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mem-token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('mem-token', token);
    } else {
      localStorage.removeItem('mem-token');
    }
  }, [token]);

  // Restore user from token on mount
  useEffect(() => {
    if (token && !user) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]!));
        setUser(payload.user);
      } catch {
        setToken(null);
      }
    }
  }, [token, user]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await authApi.register(email, password);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
