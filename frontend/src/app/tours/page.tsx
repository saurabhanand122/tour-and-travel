'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TourCard, TourType } from '@/components/TourCard/TourCard';
import { Spinner } from '@/components/Spinner/Spinner';
import { API_URL, useAuth } from '@/context/AuthContext';
import styles from './tours.module.css';

const fallbackAllTours: TourType[] = [
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
    totalReviews: 12,
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
    totalReviews: 8,
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
    totalReviews: 15,
    featured: true,
  },
  {
    _id: '4',
    title: 'Amalfi Coast & Southern Italy Getaway',
    description: 'Savor the sweetness of "La Dolce Vita" along Italy\'s Amalfi Coast. Climb the pastel Positano cliffs, tour Pompeii, and boat to Capri.',
    destination: 'Sorrento, Italy',
    price: 1199,
    duration: 6,
    maxGroupSize: 14,
    images: ['https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=1000&q=80'],
    averageRating: 4.7,
    totalReviews: 6,
    featured: false,
  },
  {
    _id: '5',
    title: 'Historic Wonders of Cairo & Nile',
    description: 'Travel back in time to the land of Pharaohs and Pyramids. Stand before the Great Sphinx, sail the Nile, and bargain at historic bazaars.',
    destination: 'Cairo, Egypt',
    price: 799,
    duration: 5,
    maxGroupSize: 20,
    images: ['https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1000&q=80'],
    averageRating: 4.6,
    totalReviews: 4,
    featured: false,
  },
  {
    _id: '6',
    title: 'Icelandic Lights & Arctic Glaciers',
    description: 'Explore a landscape of ice and fire. Walk behind waterfalls, step onto glacier ice, soak in the Blue Lagoon, and scan the skies for Aurora.',
    destination: 'Reykjavik, Iceland',
    price: 1799,
    duration: 7,
    maxGroupSize: 10,
    images: ['https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=1000&q=80'],
    averageRating: 4.9,
    totalReviews: 10,
    featured: true,
  },
];

const ToursListContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOffline, setIsOffline } = useAuth();

  // Filters state from URL query
  const urlDestination = searchParams.get('destination') || '';
  const urlDuration = searchParams.get('duration') || '';
  const urlMaxPrice = searchParams.get('maxPrice') || '';

  const [destination, setDestination] = useState(urlDestination);
  const [duration, setDuration] = useState(urlDuration);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);

  const [tours, setTours] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync inputs with URL params changes
  useEffect(() => {
    setDestination(urlDestination);
    setDuration(urlDuration);
    setMaxPrice(urlMaxPrice);
  }, [urlDestination, urlDuration, urlMaxPrice]);

  useEffect(() => {
    const fetchFilteredTours = async () => {
      setLoading(true);
      if (isOffline) {
        applyClientSideFilters();
        setLoading(false);
        return;
      }
      const params = new URLSearchParams();
      if (urlDestination) params.append('destination', urlDestination);
      if (urlDuration) params.append('duration', urlDuration);
      if (urlMaxPrice) params.append('maxPrice', urlMaxPrice);

      try {
        const res = await fetch(`${API_URL}/tours?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setTours(data.data);
          } else {
            // Apply client side filters on fallback list if success is false
            applyClientSideFilters();
          }
        } else {
          applyClientSideFilters();
        }
      } catch (err) {
        setIsOffline(true);
        console.warn('Backend server unreachable. Applying client-side filters on fallback tours.');
        applyClientSideFilters();
      } finally {
        setLoading(false);
      }
    };

    const applyClientSideFilters = () => {
      let filtered = [...fallbackAllTours];
      if (urlDestination) {
        filtered = filtered.filter(t => 
          t.destination.toLowerCase().includes(urlDestination.toLowerCase()) ||
          t.title.toLowerCase().includes(urlDestination.toLowerCase())
        );
      }
      if (urlDuration) {
        filtered = filtered.filter(t => t.duration <= Number(urlDuration));
      }
      if (urlMaxPrice) {
        filtered = filtered.filter(t => t.price <= Number(urlMaxPrice));
      }
      setTours(filtered);
    };

    fetchFilteredTours();
  }, [urlDestination, urlDuration, urlMaxPrice, isOffline, setIsOffline]);

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.append('destination', destination.trim());
    if (duration.trim()) params.append('duration', duration.trim());
    if (maxPrice.trim()) params.append('maxPrice', maxPrice.trim());
    
    router.push(`/tours?${params.toString()}`);
  };

  const clearFilters = () => {
    setDestination('');
    setDuration('');
    setMaxPrice('');
    router.push('/tours');
  };

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.titleSection}>
        <h1>Our Tour Packages</h1>
        <p>Explore our carefully designed list of trips and choose your next dream holiday.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={`${styles.sidebar} glass-panel`}>
          <h2>Filter Tours</h2>
          <form onSubmit={applyFilters}>
            <div className={styles.filterGroup}>
              <label>Destination</label>
              <input
                type="text"
                placeholder="e.g. Italy"
                className="form-input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Max Duration (Days)</label>
              <select 
                className="form-input" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Any Duration</option>
                <option value="5">Up to 5 Days</option>
                <option value="7">Up to 7 Days</option>
                <option value="10">Up to 10 Days</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Max Budget</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                className="form-input"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              {maxPrice && (
                <div className={styles.priceRangeInfo}>
                  <span>Under:</span>
                  <span>${maxPrice}</span>
                </div>
              )}
            </div>

            <button type="submit" className="btn-glow" style={{ width: '100%' }}>
              Apply Filters
            </button>
            
            {(destination || duration || maxPrice) && (
              <button type="button" onClick={clearFilters} className={styles.clearBtn}>
                Clear All
              </button>
            )}
          </form>
        </aside>

        {/* Main List Area */}
        <main className={styles.mainArea}>
          <div className={styles.resultsHeader}>
            <p>
              Showing <span className={styles.resultsCount}>{tours.length}</span> tours found
            </p>
          </div>

          {loading ? (
            <Spinner />
          ) : tours.length > 0 ? (
            <div className={styles.grid}>
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className={`${styles.emptyState} glass-panel`}>
              <div className={styles.emptyIcon}>
                <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>No Tours Match Your Search</h3>
              <p>Try modifying your destination filters or increasing your maximum budget limit.</p>
              <span onClick={clearFilters} className={styles.resetLink}>
                Reset Search Filters
              </span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '6rem 0' }}><Spinner /></div>}>
      <ToursListContent />
    </Suspense>
  );
}
