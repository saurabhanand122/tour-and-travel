'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I book a tour package?",
    answer: "You can browse our tour packages from the 'Tours' tab, click on any tour to view details, configure the number of guests, pick a date, and click 'Book Now'. You will need to log in to complete a booking."
  },
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel any booking from your User Dashboard up until 48 hours before the scheduled travel date. Cancelled bookings will receive full refunds automatically to the original payment method."
  },
  {
    question: "Are flights included in the package prices?",
    answer: "Flight inclusions depend on the specific tour. You can see what is included or excluded (like meals, flights, hotel transfers) directly on the 'Included / Excluded' list on each tour's detail page."
  },
  {
    question: "Can I customize a tour package?",
    answer: "Yes! We specialize in custom itineraries. Please fill out the contact form on this page or call our support line at +91 98765 43210. Our travel experts will create a custom package that matches your timeline and budget."
  },
  {
    question: "What support do you provide during the trip?",
    answer: "We provide 24/7 dedicated support. If you face any issues with hotel check-ins, local guides, or transfers, you can contact your dedicated assistant at the number provided in your booking confirmation."
  }
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 8000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={`${styles.contactPage} container`}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Get In Touch</span>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.desc}>
          Have any questions or want to plan a custom itinerary? Reach out to us and we'll reply within 24 hours.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Info Column */}
        <div className={styles.infoColumn}>
          <div className={`${styles.infoCard} glass-panel`}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.infoDetails}>
              <h3>Our Head Office</h3>
              <p>123 Dev Block, Sector 62, Noida, UP, India</p>
            </div>
          </div>

          <div className={`${styles.infoCard} glass-panel`}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.infoDetails}>
              <h3>Phone & WhatsApp</h3>
              <p>+91 98765 43210{"\n"}+91 98765 01234</p>
            </div>
          </div>

          <div className={`${styles.infoCard} glass-panel`}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.infoDetails}>
              <h3>Email Support</h3>
              <p>info@jaibabatravels.com{"\n"}bookings@jaibabatravels.com</p>
            </div>
          </div>

          <div className={`${styles.infoCard} glass-panel`}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.infoDetails}>
              <h3>Working Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 8:00 PM{"\n"}Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className={`${styles.formCard} glass-panel`}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          
          {submitted && (
            <div className={styles.successMessage}>
              Thank you for contacting Jai baba Tours and Travels Tour and Travels! Your message has been sent successfully. We will get back to you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                className="form-input"
                placeholder="Custom Tour Package Query"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="form-input"
                placeholder="How can we help you plan your journey?"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-glow" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqDesc}>Quick answers to some common questions about our travel services.</p>
        </div>

        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={styles.faqItem}>
                <button 
                  className={`${styles.faqQuestion} ${isOpen ? styles.faqQuestionActive : ''}`} 
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconRotated : ''}`}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
