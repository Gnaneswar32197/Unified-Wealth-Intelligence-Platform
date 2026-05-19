// src/context.tsx
import { createContext, useContext } from 'react';

export interface User {
  name: string;
  role: string;
  email?: string;
  employee_code?: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (role: string, name?: string, email?: string, employee_code?: string, token?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};