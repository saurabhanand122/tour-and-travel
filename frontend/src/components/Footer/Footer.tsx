'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        {/* Brand Column */}
        <div className={styles.column}>
          <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem', color: '#fff', fontFamily: 'var(--font-display)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22L12 17L22 22L12 2Z" fill="url(#footer-logo-grad)" stroke="url(#footer-logo-grad)" strokeWidth="2" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="footer-logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <span>Jai baba Tours &  TRAVELS</span>
          </Link>
          <p className={styles.brandDesc}>
            Discover beautiful destinations, custom tour packages, and make unforgettable memories. Jai baba Tours &  Tour and Travels is your reliable partner for planning perfect vacations.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5c0-.9.2-1.2 1-1.2h2V2h-3c-3 0-5 1.8-5 4.8V8z"/></svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.3-.1 1.6-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 0 5.7.1 4.8.3 4 .6c-.8.3-1.5.7-2.1 1.4C1.2 2.7.8 3.4.5 4.2c-.3.8-.5 1.7-.6 3C0 8.5 0 8.9 0 12s0 3.5.1 4.8c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.1.6.6 1.4 1.1 2.1 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.1-1.4.6-.6 1.1-1.4 1.4-2.1.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.1-.6-.6-1.4-1.1-2.1-1.4-.8-.3-1.7-.5-3-.6-1.3-.1-1.7-.1-4.8-.1zM12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.4a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.6c-.9.4-1.8.6-2.8.7 1-.6 1.8-1.6 2.2-2.7-1 .6-2 1-3 1.2-1-1-2.2-1.6-3.6-1.6-2.7 0-5 2.2-5 5v1.1C7.7 8.2 4.1 6.3 1.7 3.3c-.4.7-.6 1.5-.6 2.4 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.9-.4.1-.9.2-1.4.2-.3 0-.7 0-1-.1.6 2 2.5 3.5 4.7 3.5-1.7 1.4-3.9 2.2-6.3 2.2-.4 0-.8 0-1.2-.1 2.2 1.4 4.9 2.2 7.7 2.2 9.3 0 14.3-7.7 14.3-14.3v-.7c1-.7 1.8-1.5 2.5-2.5z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tours">Tour Packages</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/login">Login / Register</Link></li>
          </ul>
        </div>

        {/* Contact Us Column */}
        <div className={styles.column}>
          <h4>Contact Us</h4>
          <ul className={styles.contactInfo}>
            <li>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>123 Dev Block, Sector 62, Noida, UP, India</span>
            </li>
            <li>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>+91 98765 43210</span>
            </li>
            <li>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>info@jaibabatravels.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className={styles.column}>
          <h4>Newsletter</h4>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter to receive the latest tour updates and deals.
          </p>
          {subscribed ? (
            <p style={{ color: 'var(--accent-success)', fontSize: '0.9rem', fontWeight: 600 }}>
              ✓ Subscribed successfully!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className={styles.newsletterInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className={styles.newsletterSubmit}>
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={`${styles.bottomBar} container`}>
        <p>&copy; {new Date().getFullYear()} Jai baba Tours &  Tour and Travels. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
