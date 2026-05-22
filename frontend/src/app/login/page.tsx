'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, register, loading } = useAuth();
  
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If user is already authenticated, redirect them
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      if (isLoginTab) {
        const result = await login(email, password);
        if (!result.success) {
          setErrorMsg(result.message || 'Login failed.');
        }
      } else {
        const result = await register(name, email, password);
        if (!result.success) {
          setErrorMsg(result.message || 'Registration failed.');
        }
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const switchTab = (toLogin: boolean) => {
    setIsLoginTab(toLogin);
    setErrorMsg('');
    setName('');
    setEmail('');
    setPassword('');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h3>Checking credentials...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.authCard} glass-panel`}>
        <div className={styles.header}>
          <h1>Welcome</h1>
          <p>
            {isLoginTab
              ? 'Access your tour bookings and profile'
              : 'Create an account to book holiday packages'}
          </p>
        </div>

        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${isLoginTab ? styles.tabActive : ''}`}
            onClick={() => switchTab(true)}
          >
            Sign In
          </div>
          <div
            className={`${styles.tab} ${!isLoginTab ? styles.tabActive : ''}`}
            onClick={() => switchTab(false)}
          >
            Sign Up
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errorMsg && <div className={styles.errorCallout}>{errorMsg}</div>}

          {!isLoginTab && (
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="user@example.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} btn-glow`}
            disabled={submitting}
          >
            {submitting ? 'Processing...' : isLoginTab ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.footer}>
          {isLoginTab ? (
            <p>
              Don't have an account?{' '}
              <span className={styles.footerSpan} onClick={() => switchTab(false)}>
                Register here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span className={styles.footerSpan} onClick={() => switchTab(true)}>
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
