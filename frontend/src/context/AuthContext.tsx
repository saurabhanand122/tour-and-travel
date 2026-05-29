'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = localStorage.getItem('jaibaba_token');
        const storedUser = localStorage.getItem('jaibaba_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          if (isOffline) {
            setLoading(false);
            return;
          }

          // Option: verify token with backend
          try {
            const res = await fetch(`${API_URL}/auth/profile`, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });

            if (res.ok) {
              const data = await res.json();
              if (data.success) {
                setUser(data);
                localStorage.setItem('jaibaba_user', JSON.stringify(data));
              }
            } else {
              // Token expired or invalid
              logout();
            }
          } catch (fetchErr) {
            setIsOffline(true);
            console.warn('Backend server is offline. Enabling client-side fallback mode.');
          }
        }
      } catch (err) {
        console.warn('Error loading stored auth data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Login action
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        const userData: User = {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        };
        setUser(userData);
        localStorage.setItem('jaibaba_token', data.token);
        localStorage.setItem('jaibaba_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (err) {
      console.warn('Login error:', err);
      setIsOffline(true);
      return { success: false, message: 'Server connection failed. Is the API running?' };
    }
  };

  // Register action
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        const userData: User = {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        };
        setUser(userData);
        localStorage.setItem('jaibaba_token', data.token);
        localStorage.setItem('jaibaba_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (err) {
      console.warn('Registration error:', err);
      setIsOffline(true);
      return { success: false, message: 'Server connection failed. Is the API running?' };
    }
  };

  // Logout action
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jaibaba_token');
    localStorage.removeItem('jaibaba_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isOffline, setIsOffline, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
