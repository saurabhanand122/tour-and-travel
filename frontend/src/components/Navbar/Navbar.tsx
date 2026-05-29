'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuActive(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22L12 17L22 22L12 2Z" fill="url(#logo-grad)" stroke="url(#logo-grad)" strokeWidth="2" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <span>Jai baba Tours &  <span className={styles.logoHighlight}>TRAVELS</span></span>
        </Link>

        <div className={styles.menuToggle} onClick={() => setMenuActive(!menuActive)}>
          {menuActive ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <ul className={`${styles.navLinks} ${menuActive ? styles.navActive : ''}`}>
          <li>
            <Link 
              href="/" 
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/tours" 
              className={`${styles.navLink} ${pathname.startsWith('/tours') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Tours
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>

          {user && (
            <li>
              <Link 
                href={user.role === 'admin' ? '/admin' : '/dashboard'} 
                className={`${styles.navLink} ${pathname === '/dashboard' || pathname === '/admin' ? styles.active : ''}`}
                onClick={closeMenu}
              >
                {user.role === 'admin' ? 'Admin Panel' : 'My Bookings'}
              </Link>
            </li>
          )}

          <li>
            <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Toggle Theme" style={{ marginLeft: '1rem' }}>
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </li>

          <li className={styles.authGroup}>
            {user ? (
              <>
                <span className={styles.userName}>Hi, {user.name.split(' ')[0]}</span>
                <button onClick={() => { logout(); closeMenu(); }} className={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-glow" onClick={closeMenu}>
                Login / Register
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
