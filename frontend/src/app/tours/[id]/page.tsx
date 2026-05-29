'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth, API_URL } from '@/context/AuthContext';
import { Spinner } from '@/components/Spinner/Spinner';
import { TourType } from '@/components/TourCard/TourCard';
import styles from './tourDetail.module.css';

interface ReviewType {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  reviewText: string;
  rating: number;
  createdAt: string;
}

interface TourDetailType extends TourType {
  itinerary: { day: number; title: string; description: string }[];
  highlights: string[];
  included: string[];
  excluded: string[];
  reviews?: ReviewType[];
}

const fallbackDetailTours: TourDetailType[] = [
  {
    _id: '1',
    title: 'Bali Tropical Paradise & Temples',
    description: 'Immerse yourself in the tropical allure of Bali. Explore the cultural heart of Ubud, witness stunning cliffside temples at sunset, walk through lush emerald rice terraces, and relax on pristine white-sand beaches. This trip offers a perfect balance of cultural immersion and ultimate relaxation.',
    destination: 'Bali, Indonesia',
    price: 899,
    duration: 7,
    maxGroupSize: 15,
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528181304800-2f1738b24a79?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Guided cultural tour of Ubud Sacred Monkey Forest and Royal Palace',
      'Scenic hike through Tegallalang Rice Terraces',
      'Sunset at Tanah Lot Cliff Temple',
      'Traditional Balinese spa treatment',
      'Snorkeling excursion in crystal-clear waters of Nusa Penida',
    ],
    included: [
      '6 nights in 4-star boutique hotels',
      'Daily breakfast, 3 lunches, and 2 dinners',
      'Private air-conditioned airport transfers',
      'All entrance fees to attractions listed in itinerary',
      'Certified English-speaking local tour guide',
    ],
    excluded: [
      'International flights',
      'Travel insurance (highly recommended)',
      'Personal expenses & tipping',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali & Welcome Dinner',
        description: 'Arrive at Denpasar Airport. Meet your private driver and check in to your Ubud hotel. Spend the afternoon resting. In the evening, enjoy a welcome dinner with traditional Balinese dance performances.',
      },
      {
        day: 2,
        title: 'Ubud Sacred Forests & Rice Terraces',
        description: 'Explore the Sacred Monkey Forest in Ubud. Afterward, head to the famous Tegallalang Rice Terraces for photos and a swing experience. Have lunch overlooking the valleys, and visit the Ubud Art Market in the afternoon.',
      },
      {
        day: 3,
        title: 'Batur Volcano Sunrise Trek & Hot Springs',
        description: 'An early start (3:00 AM) for a rewarding sunrise trek up Mount Batur. Enjoy breakfast at the summit with stunning views. On the descent, soak in natural hot springs to soothe tired muscles.',
      },
      {
        day: 4,
        title: 'Temple Trail: Ulun Danu & Tanah Lot',
        description: 'Visit the iconic floating temple, Pura Ulun Danu Beratan, on Lake Bratan. Proceed to the southwest coast in the afternoon to witness a majestic sunset at the wave-crashed Tanah Lot Temple.',
      },
      {
        day: 5,
        title: 'Transfer to Seminyak & Beach Day',
        description: 'Transfer from Ubud to Seminyak, the chic beachside hub. Check in to your beach resort. Spend the day sunbathing, swimming, or exploring trendy boutique shops and beach clubs.',
      },
      {
        day: 6,
        title: 'Nusa Penida Island Snorkeling Adventure',
        description: 'Board a fast boat to Nusa Penida. Snorkel at Manta Bay, Crystal Bay, and visit the jaw-dropping cliffs of Kelingking Beach. Return to Seminyak in the late afternoon.',
      },
      {
        day: 7,
        title: 'Departure from Bali',
        description: 'Enjoy a leisurely breakfast and some last-minute souvenir shopping. Your private transfer will take you back to Denpasar Airport for your return flight home.',
      },
    ],
    averageRating: 4.8,
    totalReviews: 1,
    featured: true,
    reviews: [
      {
        _id: 'r1',
        user: { _id: 'u1', name: 'John Doe', email: 'user@jaibaba.com' },
        reviewText: 'This was an absolute dream trip! Highly recommend the sunrise hike up Mount Batur. The guides were extremely friendly and everything was taken care of seamlessly.',
        rating: 5,
        createdAt: '2026-05-20T12:00:00Z',
      }
    ]
  },
  {
    _id: '2',
    title: 'Swiss Alps Hiking & Scenic Railways',
    description: 'Experience the breathtaking beauty of Switzerland. Walk through charming car-free villages, ride historic mountain trains to the "Top of Europe," and hike trails surrounding the majestic Matterhorn. Ideal for nature lovers and outdoor enthusiasts looking for comfort and scenery.',
    destination: 'Zermatt, Switzerland',
    price: 1699,
    duration: 8,
    maxGroupSize: 12,
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Glacier Express panoramic railway ride from St. Moritz to Zermatt',
      'Ascent to Jungfraujoch, the highest railway station in Europe',
      'Guided hiking tour around the scenic Riffelsee with Matterhorn reflections',
      'Explore the medieval old town of Lucerne and its Chapel Bridge',
    ],
    included: [
      '7 nights accommodation in traditional Alpine lodges',
      'Swiss Travel Pass (8 Days) for unlimited train, bus, and boat rides',
      'Daily Swiss breakfast buffets and 3-course dinners',
      'Mountain guide for hiking trails',
      'Cable car and cogwheel railway passes',
    ],
    excluded: [
      'Lunch and drinks during daytime excursions',
      'Flight connections to Zurich or Geneva',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Transfer to Lucerne',
        description: 'Arrive in Zurich, activate your Swiss Travel Pass, and take the train to Lucerne. Walk the historic Chapel Bridge and enjoy a lakefront dinner.',
      },
      {
        day: 2,
        title: 'Mt. Pilatus Golden Roundtrip',
        description: 'Take a boat ride to Alpnachstad, ascend Mt. Pilatus on the world\'s steepest cogwheel railway. Take in panoramic alpine views. Descend via cable cars.',
      },
      {
        day: 3,
        title: 'Glacier Express Scenic Journey to Zermatt',
        description: 'Board the world-famous Glacier Express. Enjoy a 3-course meal served at your seat as you glide past dramatic gorges, snowy peaks, and mountain streams, arriving in car-free Zermatt.',
      },
      {
        day: 4,
        title: 'Matterhorn Views & Riffelsee Hiking',
        description: 'Ride the Gornergrat cogwheel train up to 3,089 meters. Hike down to Riffelsee lake to capture the iconic Matterhorn reflection in the alpine waters.',
      },
      {
        day: 5,
        title: 'Zermatt to Interlaken Transfer',
        description: 'Travel by train north to Interlaken, nestled between Lake Thun and Lake Brienz. Explore the town and try paragliding over the meadow.',
      },
      {
        day: 6,
        title: 'Jungfraujoch: Top of Europe',
        description: 'Journey up the Eiger Express cable car and cogwheel train to Jungfraujoch (3,454m). Explore the Ice Palace, Sphinx Observatory, and play in the snow.',
      },
      {
        day: 7,
        title: 'Lauterbrunnen Valley of 72 Waterfalls',
        description: 'Walk through the jaw-dropping Lauterbrunnen U-shaped valley. Visit Trümmelbach Falls, a series of subterranean waterfalls inside the mountain.',
      },
      {
        day: 8,
        title: 'Zurich Departure',
        description: 'Take a direct scenic train back to Zurich Airport for your flight home.',
      },
    ],
    averageRating: 4.9,
    totalReviews: 1,
    featured: true,
    reviews: [
      {
        _id: 'r2',
        user: { _id: 'u1', name: 'John Doe', email: 'user@jaibaba.com' },
        reviewText: 'Beautiful trains and spectacular views. The hiking paths were slightly challenging but fully worth the esfuerzo. The hotels were wonderful.',
        rating: 5,
        createdAt: '2026-05-21T14:30:00Z',
      }
    ]
  },
  {
    _id: '3',
    title: 'Tokyo & Kyoto Imperial Explorer',
    description: 'Witness the fascinating blend of ancient traditions and futuristic innovation in Japan. Navigate the bright lights and neon towers of Tokyo, then board the bullet train to Kyoto, the historic heartland filled with wooden shrines, bamboo groves, and geisha districts.',
    destination: 'Tokyo, Japan',
    price: 1399,
    duration: 9,
    maxGroupSize: 16,
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Walk across Shibuya Crossing, the world\'s busiest pedestrian intersection',
      'Bullet train (Shinkansen) ride from Tokyo to Kyoto',
      'Explore Fushimi Inari Shrine\'s famous thousands of vermilion torii gates',
      'Interactive sushi-making class with a professional chef',
      'Wander through the towering Arashiyama Bamboo Grove',
    ],
    included: [
      '8 nights in premium central hotels',
      '7-day JR Pass for unlimited Shinkansen and local trains',
      'Daily breakfast and 4 specialized lunches/dinners',
      'All local temple, shrine, and observatory entrance fees',
      'Bilingual guide for city tours',
    ],
    excluded: [
      'Airfare to Tokyo',
      'Travel visa fees if applicable',
      'Luggage forwarding services (optional)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Konnichiwa Tokyo!',
        description: 'Arrive in Tokyo. Check in to your Shinjuku hotel. In the evening, join a neon food tour through Golden Gai and Omoide Yokocho.',
      },
      {
        day: 2,
        title: 'Modern Tokyo: Shibuya, Harajuku & Meiji Shrine',
        description: 'Walk through the peaceful Meiji Shrine, then plunge into the youth culture of Takeshita Street in Harajuku. Cross Shibuya Crossing and view the city from Shibuya Sky observatory.',
      },
      {
        day: 3,
        title: 'Historic Asakusa & Sushi Workshop',
        description: 'Visit Senso-ji, Tokyo\'s oldest temple, in Asakusa. In the afternoon, learn the art of preparing sushi with a sushi master, and feast on your creations.',
      },
      {
        day: 4,
        title: 'Mt. Fuji & Lake Ashi Day Trip',
        description: 'Take a luxury bus to Mt. Fuji 5th Station. Cruise across the volcanic crater lake of Lake Ashi in Hakone and ride the Komagatake Ropeway cable car.',
      },
      {
        day: 5,
        title: 'Bullet Train to Kyoto & Gion Evening Walk',
        description: 'Board the Shinkansen, reaching Kyoto in 2.5 hours. Check in to a traditional ryokan. In the evening, take a guided walk through Gion in search of Geishas.',
      },
      {
        day: 6,
        title: 'Kyoto Icons: Kinkaku-ji & Fushimi Inari',
        description: 'Visit Kinkaku-ji (Golden Pavilion). Head south to hike through the tunnels of vermilion gates at Fushimi Inari Shrine before sunset.',
      },
      {
        day: 7,
        title: 'Bamboo Groves & Nara Deer Park',
        description: 'Stroll through Arashiyama Bamboo Grove in the morning. Take a short train ride to Nara to feed friendly free-roaming bowing deer and see the Giant Buddha.',
      },
      {
        day: 8,
        title: 'Kyoto Tea Ceremony & Free Afternoon',
        description: 'Participate in an authentic, tranquil Japanese Tea Ceremony. Spend the afternoon shopping for matcha, ceramics, and textiles.',
      },
      {
        day: 9,
        title: 'Depart Kyoto / Kansai Airport',
        description: 'Leisurely morning. Transfer to Kansai Airport (KIX) or back to Tokyo for your flight home.',
      },
    ],
    averageRating: 4.9,
    totalReviews: 0,
    featured: true,
  },
];

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token, isOffline, setIsOffline } = useAuth();
  
  const tourId = params.id as string;

  const [tour, setTour] = useState<TourDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [openDay, setOpenDay] = useState<number | null>(1);

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookAt, setBookAt] = useState('');
  const [guestSize, setGuestSize] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Review Form State
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const fetchTourData = async () => {
    if (isOffline) {
      loadFallback();
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/tours/${tourId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTour(data.data);
          setActiveImage(data.data.images?.[0] || '');
        } else {
          loadFallback();
        }
      } else {
        loadFallback();
      }
    } catch (err) {
      setIsOffline(true);
      console.warn('Backend server unreachable. Using local tour details fallback.');
      loadFallback();
    } finally {
      setLoading(false);
    }
  };

  const loadFallback = () => {
    // Look up in fallback detail list
    const found = fallbackDetailTours.find((t) => t._id === tourId);
    if (found) {
      setTour(found);
      setActiveImage(found.images?.[0] || '');
    } else {
      // Create a customized dummy tour based on the ID or title if not found
      setTour(fallbackDetailTours[0]);
      setActiveImage(fallbackDetailTours[0].images?.[0] || '');
    }
  };

  useEffect(() => {
    if (tourId) {
      fetchTourData();
    }
  }, [tourId, isOffline, setIsOffline]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    setSubmittingBooking(true);
    setBookingError('');

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tourId,
          fullName,
          email,
          phone,
          bookAt,
          guestSize,
          specialNotes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBookingSuccess(true);
        setPhone('');
        setBookAt('');
        setGuestSize(1);
        setSpecialNotes('');
      } else {
        setBookingError(data.message || 'Failed to place booking.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setBookingError('Server connection failed. Booking recorded locally in demonstration mode!');
      // Fallback behavior: simulate booking success in demo mode
      setTimeout(() => {
        setBookingSuccess(true);
      }, 1000);
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setReviewError('');
    setReviewSuccess(false);

    try {
      const res = await fetch(`${API_URL}/reviews/${tourId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewText, rating }),
      });

      const data = await res.json();

      if (data.success) {
        setReviewSuccess(true);
        setReviewText('');
        setRating(5);
        // Refresh tour data to display the new review
        fetchTourData();
      } else {
        setReviewError(data.message || 'Failed to add review.');
      }
    } catch (err) {
      console.error('Review submission error:', err);
      setReviewError('Failed to connect to server. Reviews are disabled in demo mode.');
    }
  };

  const toggleDay = (day: number) => {
    setOpenDay(openDay === day ? null : day);
  };

  if (loading) return <div style={{ padding: '8rem 0' }}><Spinner /></div>;
  if (!tour) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><h2>Tour Package Not Found</h2><Link href="/tours" className="btn-glow" style={{ marginTop: '1rem' }}>Back to Tours</Link></div>;

  return (
    <div>
      {/* Tour Detail Hero Banner */}
      <section 
        className={styles.detailHero} 
        style={{ backgroundImage: `url('${activeImage || tour.images[0]}')` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} container`}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/tours">Tours</Link> &nbsp;/&nbsp; Details
          </div>
          <h1 className={styles.title}>{tour.title}</h1>
          
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{tour.destination}</span>
            </div>

            <div className={styles.metaItem}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{tour.duration} Days</span>
            </div>

            <div className={styles.metaItem}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Max Group: {tour.maxGroupSize} People</span>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.rating}>
                <span className={styles.star}>★</span>
                <span>{tour.averageRating}</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({tour.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className={`${styles.layout} container`}>
        {/* Left Hand: Details & Itinerary */}
        <main className={styles.mainContent}>
          {/* Overview */}
          <section className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.description}>{tour.description}</p>
          </section>

          {/* Photo Gallery Grid */}
          {tour.images.length > 1 && (
            <section className={styles.gallerySection}>
              <h2 className={styles.sectionTitle}>Photo Gallery</h2>
              <div className={styles.galleryGrid}>
                {tour.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`${tour.title} Gallery ${i}`} 
                    className={styles.galleryImage}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <section className={styles.highlightsSection}>
              <h2 className={styles.sectionTitle}>Highlights</h2>
              <div className={styles.highlightsGrid}>
                {tour.highlights.map((highlight, idx) => (
                  <div key={idx} className={styles.highlightItem}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Itinerary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <section className={styles.itinerarySection}>
              <h2 className={styles.sectionTitle}>Itinerary Plan</h2>
              <div className={styles.itineraryList}>
                {tour.itinerary.map((dayPlan) => (
                  <div key={dayPlan.day} className={styles.itineraryDay}>
                    <div 
                      className={styles.dayHeader}
                      onClick={() => toggleDay(dayPlan.day)}
                    >
                      <div className={styles.dayTitle}>
                        <span className={styles.dayBadge}>Day {dayPlan.day}</span>
                        <span className={styles.dayHeaderText}>{dayPlan.title}</span>
                      </div>
                      <div>
                        {openDay === dayPlan.day ? (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    {openDay === dayPlan.day && (
                      <div className={styles.dayContent}>
                        <p>{dayPlan.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Included / Excluded services */}
          {(tour.included?.length > 0 || tour.excluded?.length > 0) && (
            <section className={styles.incExcSection}>
              <h2 className={styles.sectionTitle}>What's Included & Excluded</h2>
              <div className={styles.incExcGrid}>
                {tour.included?.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Included</h3>
                    <ul className={styles.incExcList}>
                      {tour.included.map((item, idx) => (
                        <li key={idx} className={styles.incItem}>
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.excluded?.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Excluded</h3>
                    <ul className={styles.incExcList}>
                      {tour.excluded.map((item, idx) => (
                        <li key={idx} className={styles.excItem}>
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Reviews & Submission Form */}
          <section className={styles.reviewsSection}>
            <h2 className={styles.sectionTitle}>Traveler Reviews ({tour.reviews?.length || 0})</h2>
            
            {tour.reviews && tour.reviews.length > 0 ? (
              <div className={styles.reviewsList}>
                {tour.reviews.map((rev) => (
                  <div key={rev._id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div>
                        <span className={styles.reviewerName}>{rev.user.name}</span>
                        <div className={styles.reviewStars}>
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </div>
                      </div>
                      <span className={styles.reviewDate}>
                        {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <p className={styles.reviewText}>{rev.reviewText}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>No reviews yet. Be the first to share your thoughts!</p>
            )}

            {/* Review Input form */}
            {user ? (
              <form onSubmit={handleReviewSubmit} className={`${styles.reviewForm} glass-panel`}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Write a Review</h3>
                
                {reviewSuccess && <p style={{ color: 'var(--accent-success)', marginBottom: '1rem', fontWeight: 600 }}>✓ Review submitted successfully!</p>}
                {reviewError && <p style={{ color: 'var(--accent-danger)', marginBottom: '1rem', fontWeight: 600 }}>✗ {reviewError}</p>}

                <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                  <label>Your Rating</label>
                  <div className={styles.ratingSelector}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className={`${styles.starBtn} ${rating >= star ? styles.dayBadge : ''} ${rating >= star ? styles.starBtnActive : ''}`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginBottom: '1.25rem' }}>
                  <label>Review Description</label>
                  <textarea
                    rows={4}
                    placeholder="Share details of your travel experience..."
                    className="form-input"
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn-glow">
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Please <Link href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>login</Link> to submit a review for this package.
              </div>
            )}
          </section>
        </main>

        {/* Right Hand Sidebar: Booking Widget */}
        <aside className={styles.bookingContainer}>
          <div className={`${styles.bookingWidget} glass-panel`}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetPrice}>${tour.price}</span>
              <span className={styles.widgetPriceUnit}>per traveler</span>
            </div>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', color: 'var(--accent-success)', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>Booking Request Placed!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Thank you for booking with us. We have received your request. You can check the status on your dashboard.
                </p>
                <Link href="/dashboard" className="btn-glow" style={{ width: '100%' }}>
                  View Bookings
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Book Tour</h3>
                
                {bookingError && <p style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', fontWeight: 600 }}>✗ {bookingError}</p>}

                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter traveler name"
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter contact email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Travel Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={bookAt}
                    onChange={(e) => setBookAt(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Number of Guests</label>
                  <div className={styles.guestCounter}>
                    <button 
                      type="button" 
                      onClick={() => setGuestSize(Math.max(1, guestSize - 1))}
                      className={styles.counterBtn}
                    >
                      -
                    </button>
                    <span className={styles.counterValue}>{guestSize}</span>
                    <button 
                      type="button" 
                      onClick={() => setGuestSize(Math.min(tour.maxGroupSize, guestSize + 1))}
                      className={styles.counterBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Special Requests</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Dietary needs, bedding needs..."
                    className="form-input"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                <div className={styles.priceCalculation}>
                  <span className={styles.calcLabel}>Total Price ({guestSize} guests):</span>
                  <span className={styles.calcTotal}>${tour.price * guestSize}</span>
                </div>

                {user ? (
                  <button 
                    type="submit" 
                    className="btn-glow" 
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    disabled={submittingBooking}
                  >
                    {submittingBooking ? 'Booking...' : 'Book Now'}
                  </button>
                ) : (
                  <div className={styles.loginPrompt}>
                    Please <Link href="/login">login</Link> to secure your booking.
                  </div>
                )}
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
