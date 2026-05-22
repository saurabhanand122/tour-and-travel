'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TourCard, TourType } from '@/components/TourCard/TourCard';
import { Spinner } from '@/components/Spinner/Spinner';
import { API_URL } from '@/context/AuthContext';
import styles from './page.module.css';

// Hardcoded fallback data in case backend is offline
const fallbackTours: TourType[] = [
  {
    _id: '1',
    title: 'Bali Tropical Paradise & Temples',
    description: 'Immerse yourself in the tropical allure of Bali. Explore Ubud Monkey Forest, walk through lush rice terraces, and visit Tanah Lot Temple at sunset.',
    destination: 'Bali, Indonesia',
    price: 899,
    duration: 7,
    maxGroupSize: 15,
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80'],
    averageRating: 4.8,
    totalReviews: 24,
    featured: true,
  },
  {
    _id: '2',
    title: 'Swiss Alps Hiking & Scenic Railways',
    description: 'Experience the breathtaking beauty of Switzerland. Ride the Glacier Express, hike under the Matterhorn, and explore the medieval town of Lucerne.',
    destination: 'Zermatt, Switzerland',
    price: 1699,
    duration: 8,
    maxGroupSize: 12,
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'],
    averageRating: 4.9,
    totalReviews: 18,
    featured: true,
  },
  {
    _id: '3',
    title: 'Tokyo & Kyoto Imperial Explorer',
    description: 'Witness the blend of futuristic innovation and ancient tradition in Japan. Explore Tokyo, ride the bullet train, and walk Kyoto\'s torii gates.',
    destination: 'Tokyo, Japan',
    price: 1399,
    duration: 9,
    maxGroupSize: 16,
    images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80'],
    averageRating: 4.9,
    totalReviews: 32,
    featured: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [tours, setTours] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);

  // Search form state
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        const res = await fetch(`${API_URL}/tours?featured=true`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data.length > 0) {
            setTours(data.data);
          } else {
            setTours(fallbackTours);
          }
        } else {
          setTours(fallbackTours);
        }
      } catch (err) {
        console.error('Failed to fetch featured tours, using fallback:', err);
        setTours(fallbackTours);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.append('destination', destination.trim());
    if (duration.trim()) params.append('duration', duration.trim());
    if (maxPrice.trim()) params.append('maxPrice', maxPrice.trim());
    
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>Explore the World with Us</span>
          <h1 className={styles.title}>
            Crafting Unforgettable <br />
            <span className={styles.titleHighlight}>Journeys & Adventures</span>
          </h1>
          <p className={styles.tagline}>
            Explore exotic beaches, snowy mountains, and historic cities with Jai baba Tours  Tour and Travels. Custom packages tailored just for you.
          </p>
        </div>

        {/* Search Widget */}
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={`${styles.searchWidget} glass-panel`}>
            <div className={styles.searchField}>
              <label>Destination</label>
              <input
                type="text"
                placeholder="Where to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            
            <div className={styles.searchField}>
              <label>Max Duration (Days)</label>
              <input
                type="number"
                placeholder="e.g. 7"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className={styles.searchField}>
              <label>Budget Limit</label>
              <input
                type="number"
                placeholder="e.g. 1000"
                min="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSubtitle}>Tour Packages</span>
          <h2 className={styles.sectionTitle}>Featured Journeys</h2>
          <p className={styles.sectionText}>
            Our most popular handpicked destinations. Check out these highly recommended packages ready to book today.
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.toursGrid}>
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.section} style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className={`${styles.section} container`} style={{ padding: 0 }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Our Promises</span>
            <h2 className={styles.sectionTitle}>Why Choose Jai baba Tours  Travels</h2>
            <p className={styles.sectionText}>
              We aim to make your travel experience smooth, comfortable, and absolutely delightful.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Best Prices</h3>
              <p>High value and competitive pricing on all flight, resort, and local sightseeing packages.</p>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Luxury Stays</h3>
              <p>We partner only with highly rated 4-star and 5-star boutique hotels to ensure your comfort.</p>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Our dedicated travel assistants are available round-the-clock during your tours to solve any issues.</p>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Safe Travels</h3>
              <p>Top standard travel insurance options and verified local guides for full safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>15k+</span>
              <span className={styles.statLabel}>Happy Travelers</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>250+</span>
              <span className={styles.statLabel}>Tour Packages</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>120+</span>
              <span className={styles.statLabel}>Destinations</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>4.9/5</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSubtitle}>Reviews</span>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <p className={styles.sectionText}>
            Hear about the experiences of our real clients who booked their dream vacations with us.
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={`${styles.testimonialCard} glass-panel`}>
            <span className={styles.quoteIcon}>“</span>
            <div className={styles.rating}>★★★★★</div>
            <p className={styles.comment}>
              "Our family trip to Bali with Jai baba Tours  Travels was absolutely mind-blowing. The villa accommodations were premium and our tour driver was exceptionally kind."
            </p>
            <div className={styles.userProfile}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Sarah Connor" className={styles.userAvatar} />
              <div className={styles.userDetails}>
                <h4>Sarah Jenkins</h4>
                <span>Booked Bali Family Tour</span>
              </div>
            </div>
          </div>

          <div className={`${styles.testimonialCard} glass-panel`}>
            <span className={styles.quoteIcon}>“</span>
            <div className={styles.rating}>★★★★★</div>
            <p className={styles.comment}>
              "Everything was perfectly planned! Riding the Swiss railways was a dream. The itinerary had the perfect pace of activity and relaxation."
            </p>
            <div className={styles.userProfile}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Michael Scott" className={styles.userAvatar} />
              <div className={styles.userDetails}>
                <h4>Michael Thornton</h4>
                <span>Booked Swiss Alps Adventure</span>
              </div>
            </div>
          </div>

          <div className={`${styles.testimonialCard} glass-panel`}>
            <span className={styles.quoteIcon}>“</span>
            <div className={styles.rating}>★★★★★</div>
            <p className={styles.comment}>
              "Japan is complex to navigate, but Jai baba Tours  travels provided a seamless guide, JR passes, and restaurant recommendations that made the journey extremely easy!"
            </p>
            <div className={styles.userProfile}>
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Alex Mercer" className={styles.userAvatar} />
              <div className={styles.userDetails}>
                <h4>Alex Rivera</h4>
                <span>Booked Tokyo Imperial Explorer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
