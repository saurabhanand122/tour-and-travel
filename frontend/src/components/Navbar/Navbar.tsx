'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
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
          <span>Jai baba Tours and Travels <span className={styles.logoHighlight}>TRAVELS</span></span>
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
