import { useState } from 'react';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthContext, type User } from './context.tsx';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('wealth-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: string, name?: string, email?: string, employee_code?: string, token?: string) => {
    // Normalization logic:
    let normalizedRole = role;
    const upper = role.toUpperCase();
    if (upper === 'ADMIN') normalizedRole = 'SuperAdmin';
    else if (upper === 'ADVISOR') normalizedRole = 'Advisory';
    else if (upper === 'OPERATIONS') normalizedRole = 'Operations';
    else if (upper === 'COMPLIANCE') normalizedRole = 'Compliance';
    else if (upper === 'SECURITY') normalizedRole = 'Security';

    const newUser = { 
      name: name || 'Alex Mercer', 
      role: normalizedRole, 
      email: email || '', 
      employee_code: employee_code || '',
      token: token || ''
    };
    
    if (token) {
      localStorage.setItem('wealth-token', token);
    }
    localStorage.setItem('wealth-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('wealth-user');
    localStorage.removeItem('wealth-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <AppRoutes />
    </AuthContext.Provider>
  );
}