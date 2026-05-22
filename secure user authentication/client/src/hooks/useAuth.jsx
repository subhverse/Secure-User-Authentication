import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, saveAuth, clearAuth } from '../utils/storage';
import { getMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getAuth());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const stored = getAuth();
      if (!stored?.token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await getMe();
        const updated = { ...stored, ...data };
        saveAuth(updated);
        setUser(updated);
      } catch {
        clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const loginUser = (data) => {
    saveAuth(data);
    setUser(data);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    saveAuth(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logout,
        updateUser,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
