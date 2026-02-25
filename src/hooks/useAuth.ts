import { useState, useCallback, useEffect } from 'react';

export interface AuthUser {
  name: string;
  mobile: string;
}

const STORAGE_KEY = 'nutri-auth-user';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = !!user;

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { user, isLoggedIn, login, logout };
}
