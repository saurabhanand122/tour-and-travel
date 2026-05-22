'use client';

import React from 'react';
import Link from 'next/link';
import styles from './TourCard.module.css';

export interface TourType {
  _id: string;
  title: string;
  destination: string;
  price: number;
  duration: number;
  maxGroupSize: number;
  images: string[];
  description: string;
  averageRating: number;
  totalReviews: number;
  featured: boolean;
}

interface TourCardProps {
  tour: TourType;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const {
    _id,
    title,
    destination,
    price,
    duration,
    images,
    description,
    averageRating,
    totalReviews,
    featured,
  } = tour;

  // Use the first image or a fallback
  const displayImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80';

  return (
    <div className={`${styles.card} glass-panel glass-panel-hover`}>
      <div className={styles.imageWrapper}>
        {featured && <span className={styles.featuredBadge}>Featured</span>}
        <img src={displayImage} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.priceBadge}>
          ${price} <span className={styles.priceUnit}>/ person</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.destination}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{destination.split(',')[0]}</span>
          </div>

          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span>{averageRating}</span>
            <span className={styles.reviewsCount}>({totalReviews})</span>
          </div>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <div className={styles.duration}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{duration} Days</span>
          </div>

          <Link href={`/tours/${_id}`} className={styles.actionBtn}>
            Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
