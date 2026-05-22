'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, API_URL } from '@/context/AuthContext';
import { Spinner } from '@/components/Spinner/Spinner';
import styles from './admin.module.css';

interface BookingAdminType {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
    price: number;
    destination: string;
    duration: number;
  } | null;
  fullName: string;
  email: string;
  phone: string;
  bookAt: string;
  guestSize: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface TourAdminType {
  _id: string;
  title: string;
  destination: string;
  price: number;
  duration: number;
  averageRating: number;
  totalReviews: number;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const [activeTab, setActiveTab] = useState<'bookings' | 'tours'>('bookings');
  
  // Lists State
  const [bookings, setBookings] = useState<BookingAdminType[]>([]);
  const [tours, setTours] = useState<TourAdminType[]>([]);
  
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);

  // Stats State
  const [stats, setStats] = useState({
    totalTours: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
  });

  // Modal State for Creating Tour
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourTitle, setTourTitle] = useState('');
  const [tourDesc, setTourDesc] = useState('');
  const [tourDest, setTourDest] = useState('');
  const [tourPrice, setTourPrice] = useState('');
  const [tourDuration, setTourDuration] = useState('');
  const [tourGroupSize, setTourGroupSize] = useState('');
  const [tourImages, setTourImages] = useState('');
  const [tourHighlights, setTourHighlights] = useState('');
  const [tourIncluded, setTourIncluded] = useState('');
  const [tourExcluded, setTourExcluded] = useState('');
  const [submittingTour, setSubmittingTour] = useState(false);

  // Security Check
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  // Fetch all Bookings
  const fetchBookings = async () => {
    if (!token) return;
    setLoadingBookings(true);
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch bookings, using mock:', err);
      // Load mock bookings
      loadMockBookings();
    } finally {
      setLoadingBookings(false);
    }
  };

  // Fetch all Tours
  const fetchTours = async () => {
    setLoadingTours(true);
    try {
      const res = await fetch(`${API_URL}/tours`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTours(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch tours, using mock:', err);
      // Load mock tours
      loadMockTours();
    } finally {
      setLoadingTours(false);
    }
  };

  const loadMockBookings = () => {
    setBookings([
      {
        _id: 'b1',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 99999 88888',
        bookAt: '2026-06-15T00:00:00Z',
        guestSize: 2,
        totalPrice: 1798,
        status: 'pending',
        createdAt: new Date().toISOString(),
        user: { _id: 'u2', name: 'Jane Smith', email: 'jane@example.com' },
        tour: { _id: '1', title: 'Bali Tropical Paradise & Temples', price: 899, destination: 'Bali, Indonesia', duration: 7 }
      },
      {
        _id: 'b2',
        fullName: 'John Doe',
        email: 'user@jaibaba.com',
        phone: '+91 98765 43210',
        bookAt: '2026-07-20T00:00:00Z',
        guestSize: 1,
        totalPrice: 1699,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        user: { _id: 'u1', name: 'John Doe', email: 'user@jaibaba.com' },
        tour: { _id: '2', title: 'Swiss Alps Hiking & Scenic Railways', price: 1699, destination: 'Zermatt, Switzerland', duration: 8 }
      }
    ]);
  };

  const loadMockTours = () => {
    setTours([
      { _id: '1', title: 'Bali Tropical Paradise & Temples', destination: 'Bali, Indonesia', price: 899, duration: 7, averageRating: 4.8, totalReviews: 24 },
      { _id: '2', title: 'Swiss Alps Hiking & Scenic Railways', destination: 'Zermatt, Switzerland', price: 1699, duration: 8, averageRating: 4.9, totalReviews: 18 },
      { _id: '3', title: 'Tokyo & Kyoto Imperial Explorer', destination: 'Tokyo, Japan', price: 1399, duration: 9, averageRating: 4.9, totalReviews: 32 }
    ]);
  };

  useEffect(() => {
    if (user && user.role === 'admin' && token) {
      fetchBookings();
      fetchTours();
    }
  }, [user, token]);

  // Recalculate stats whenever lists update
  useEffect(() => {
    const totalToursCount = tours.length;
    const totalBookingsCount = bookings.length;
    const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;
    const totalRevenueSum = bookings
      .filter((b) => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    setStats({
      totalTours: totalToursCount,
      totalBookings: totalBookingsCount,
      pendingBookings: pendingBookingsCount,
      totalRevenue: totalRevenueSum,
    });
  }, [bookings, tours]);

  // Update Booking Status (Confirm / Cancel)
  const handleUpdateStatus = async (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
        );
        alert(`Booking updated to ${newStatus}.`);
      } else {
        // Fallback for mock/demo
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
        );
        alert(`Booking status updated locally in demonstration mode.`);
      }
    } catch (err) {
      console.error(err);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
      alert(`Booking status updated locally in demonstration mode.`);
    }
  };

  // Delete Tour Package
  const handleDeleteTour = async (tourId: string) => {
    if (!confirm('Are you sure you want to delete this tour package permanently?')) return;

    try {
      const res = await fetch(`${API_URL}/tours/${tourId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTours((prev) => prev.filter((t) => t._id !== tourId));
        alert('Tour deleted successfully.');
      } else {
        setTours((prev) => prev.filter((t) => t._id !== tourId));
        alert('Tour deleted locally in demonstration mode.');
      }
    } catch (err) {
      console.error(err);
      setTours((prev) => prev.filter((t) => t._id !== tourId));
      alert('Tour deleted locally in demonstration mode.');
    }
  };

  // Submit Create Tour Form
  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingTour(true);

    // Format fields
    const formattedImages = tourImages.split(',').map((img) => img.trim()).filter(Boolean);
    const formattedHighlights = tourHighlights.split(',').map((h) => h.trim()).filter(Boolean);
    const formattedIncluded = tourIncluded.split(',').map((inc) => inc.trim()).filter(Boolean);
    const formattedExcluded = tourExcluded.split(',').map((exc) => exc.trim()).filter(Boolean);

    // Create simple itinerary framework
    const daysCount = Number(tourDuration) || 1;
    const defaultItinerary = Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1} Sightseeing & Travel`,
      description: `Explore details and destinations on day ${i + 1} of your premium trip. Included visits to local hubs, meals, and accommodations.`,
    }));

    const tourPayload = {
      title: tourTitle,
      description: tourDesc,
      destination: tourDest,
      price: Number(tourPrice),
      duration: Number(tourDuration),
      maxGroupSize: Number(tourGroupSize) || 12,
      images: formattedImages.length > 0 ? formattedImages : ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'],
      highlights: formattedHighlights,
      included: formattedIncluded,
      excluded: formattedExcluded,
      itinerary: defaultItinerary,
    };

    try {
      const res = await fetch(`${API_URL}/tours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tourPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('New tour package created successfully!');
        fetchTours(); // Reload tours list
        closeModal();
      } else {
        // Fallback mock append
        const mockNewTour = {
          _id: Math.random().toString(),
          title: tourTitle,
          destination: tourDest,
          price: Number(tourPrice),
          duration: Number(tourDuration),
          averageRating: 5.0,
          totalReviews: 0,
        };
        setTours((prev) => [mockNewTour, ...prev]);
        alert('New tour package created locally in demonstration mode!');
        closeModal();
      }
    } catch (err) {
      console.error(err);
      const mockNewTour = {
        _id: Math.random().toString(),
        title: tourTitle,
        destination: tourDest,
        price: Number(tourPrice),
        duration: Number(tourDuration),
        averageRating: 5.0,
        totalReviews: 0,
      };
      setTours((prev) => [mockNewTour, ...prev]);
      alert('New tour package created locally in demonstration mode!');
      closeModal();
    } finally {
      setSubmittingTour(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTourTitle('');
    setTourDesc('');
    setTourDest('');
    setTourPrice('');
    setTourDuration('');
    setTourGroupSize('');
    setTourImages('');
    setTourHighlights('');
    setTourIncluded('');
    setTourExcluded('');
  };

  if (loading || !user || user.role !== 'admin') return <div style={{ padding: '8rem 0' }}><Spinner /></div>;

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.headerRow}>
        <div>
          <h1>Administration Panel</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, admin. Track bookings, manage catalog, and check revenue metrics.</p>
        </div>
        
        {activeTab === 'tours' && (
          <button onClick={() => setIsModalOpen(true)} className="btn-glow">
            + Create Tour
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <section className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel`}>
          <span>Active Tours</span>
          <span className={styles.statValue}>{stats.totalTours}</span>
          <span>In database catalog</span>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <span>Total Bookings</span>
          <span className={styles.statValue}>{stats.totalBookings}</span>
          <span>Traveler requests</span>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <span>Pending Approvals</span>
          <span className={styles.statValue} style={{ color: 'var(--accent-warning)' }}>{stats.pendingBookings}</span>
          <span>Awaiting review</span>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <span>Confirmed Revenue</span>
          <span className={styles.statValue} style={{ color: 'var(--accent-success)' }}>${stats.totalRevenue}</span>
          <span>Earned bookings value</span>
        </div>
      </section>

      {/* Tab Switchers */}
      <div className={styles.tabs}>
        <div 
          className={`${styles.tab} ${activeTab === 'bookings' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Manage Bookings ({bookings.length})
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'tours' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('tours')}
        >
          Manage Tours ({tours.length})
        </div>
      </div>

      {/* Main Tables */}
      <section className="glass-panel" style={{ padding: '0.25rem' }}>
        {activeTab === 'bookings' ? (
          loadingBookings ? (
            <Spinner />
          ) : bookings.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Traveler</th>
                    <th>Tour package</th>
                    <th>Travel Date</th>
                    <th>Guests</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{booking.fullName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{booking.email}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{booking.phone}</div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{booking.tour?.title || 'Unknown Tour'}</td>
                      <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                      <td>{booking.guestSize}</td>
                      <td style={{ fontWeight: 700, color: 'url(#)' }}>${booking.totalPrice}</td>
                      <td>
                        <span className={`badge badge-${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        {booking.status === 'pending' ? (
                          <div className={styles.actionGroup}>
                            <button
                              onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                              className={`${styles.actionBtn} ${styles.actionBtnConfirm}`}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                              className={`${styles.actionBtn} ${styles.actionBtnCancel}`}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Reviewed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No traveler bookings found.</p>
          )
        ) : (
          loadingTours ? (
            <Spinner />
          ) : tours.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tour Title</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Ratings</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((t) => (
                    <tr key={t._id}>
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</td>
                      <td>{t.destination}</td>
                      <td style={{ fontWeight: 700 }}>${t.price}</td>
                      <td>{t.duration} Days</td>
                      <td>
                        <span style={{ color: 'var(--accent-warning)' }}>★</span> {t.averageRating} ({t.totalReviews})
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteTour(t._id)}
                          className={`${styles.actionBtn} ${styles.actionBtnCancel} ${styles.actionBtnDelete}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No tours in database catalog.</p>
          )
        )}
      </section>

      {/* Create Tour Modal Overlay */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} glass-panel`}>
            <div className={styles.modalHeader}>
              <h2>Create New Tour Package</h2>
              <span className={styles.modalClose} onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            </div>

            <form onSubmit={handleCreateTour}>
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}>
                  <label>Tour Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bali Tropical Paradise & Temples"
                    className="form-input"
                    value={tourTitle}
                    onChange={(e) => setTourTitle(e.target.value)}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label>Destination Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ubud, Bali, Indonesia"
                    className="form-input"
                    value={tourDest}
                    onChange={(e) => setTourDest(e.target.value)}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label>Description Overview</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide detailed description of the travel experience..."
                    className="form-input"
                    value={tourDesc}
                    onChange={(e) => setTourDesc(e.target.value)}
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label>Price ($ per guest)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 899"
                    className="form-input"
                    value={tourPrice}
                    onChange={(e) => setTourPrice(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Duration (in Days)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 7"
                    className="form-input"
                    value={tourDuration}
                    onChange={(e) => setTourDuration(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Max Group Size</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    className="form-input"
                    value={tourGroupSize}
                    onChange={(e) => setTourGroupSize(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Images (Comma-separated URLs)</label>
                  <input
                    type="text"
                    placeholder="URL 1, URL 2..."
                    className="form-input"
                    value={tourImages}
                    onChange={(e) => setTourImages(e.target.value)}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label>Highlights (Comma-separated list)</label>
                  <input
                    type="text"
                    placeholder="Highlight 1, Highlight 2..."
                    className="form-input"
                    value={tourHighlights}
                    onChange={(e) => setTourHighlights(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Included Services (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Hotel accommodation, Airport transfers..."
                    className="form-input"
                    value={tourIncluded}
                    onChange={(e) => setTourIncluded(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Excluded Services (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Flights, Travel insurance..."
                    className="form-input"
                    value={tourExcluded}
                    onChange={(e) => setTourExcluded(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={closeModal} className={styles.clearBtn} style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-secondary)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-glow" disabled={submittingTour}>
                  {submittingTour ? 'Creating...' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
