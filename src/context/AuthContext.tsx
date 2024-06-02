import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN, GET_USER } from '../query/queries';

interface AuthContextType {
  user: { id: number; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userId, setUserId] = useState<number | null>(localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId') as string) : null);
  const [getUser, { data }] = useLazyQuery(GET_USER);

  const [loginMutation] = useMutation(LOGIN);

  useEffect(() => {
    if (token && userId !== null) {
      getUser({ variables: { userId } });
    }
  }, [token, userId, getUser]);

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      const token = data?.login.accessToken;
      const userId = data?.login.id;
      if (token && userId !== undefined) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId.toString());
        setToken(token);
        setUserId(userId);
        getUser({ variables: { userId } });
      }
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};