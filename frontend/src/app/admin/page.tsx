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
  const { user, token, loading, login } = useAuth();

  const [activeTab, setActiveTab] = useState<'bookings' | 'tours' | 'users' | 'reviews' | 'messages'>('bookings');
  
  // Lists State
  const [bookings, setBookings] = useState<BookingAdminType[]>([]);
  const [tours, setTours] = useState<TourAdminType[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Admin login states
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [loggingInAdmin, setLoggingInAdmin] = useState(false);

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

  // Admin Custom Login handler
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setLoggingInAdmin(true);

    try {
      const res = await login(adminUsername, adminPassword);
      if (res.success) {
        setAdminUsername('');
        setAdminPassword('');
      } else {
        setAdminError(res.message || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setAdminError('Failed to connect to authentication service.');
    } finally {
      setLoggingInAdmin(false);
    }
  };

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

  // Fetch all Users
  const fetchUsers = async () => {
    if (!token) return;
    setLoadingUsers(true);
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUsersList(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch users, using mock:', err);
      loadMockUsers();
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch all Reviews
  const fetchReviews = async () => {
    if (!token) return;
    setLoadingReviews(true);
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setReviews(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviews, using mock:', err);
      loadMockReviews();
    } finally {
      setLoadingReviews(false);
    }
  };

  // Fetch all Messages
  const fetchMessages = async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const res = await fetch(`${API_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch messages, using mock:', err);
      loadMockMessages();
    } finally {
      setLoadingMessages(false);
    }
  };

  const loadMockUsers = () => {
    setUsersList([
      { _id: 'u1', name: 'John Doe', email: 'user@jaibaba.com', role: 'user', createdAt: new Date().toISOString() },
      { _id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: new Date().toISOString() },
      { _id: 'u3', name: 'Shubham Admin', email: 'shubham@123456', role: 'admin', createdAt: new Date().toISOString() }
    ]);
  };

  const loadMockReviews = () => {
    setReviews([
      { _id: 'r1', user: { name: 'John Doe', email: 'user@jaibaba.com' }, tour: { title: 'Swiss Alps Hiking & Scenic Railways' }, rating: 5, reviewText: 'Spectacular views and great hotels!', createdAt: new Date().toISOString() }
    ]);
  };

  const loadMockMessages = () => {
    setMessages([
      { _id: 'm1', name: 'Alice Green', email: 'alice@example.com', subject: 'Custom itinerary query', message: 'Hello, I want to plan a custom trip to Japan for 12 days. Can you help?', createdAt: new Date().toISOString() }
    ]);
  };

  useEffect(() => {
    if (user && user.role === 'admin' && token) {
      fetchBookings();
      fetchTours();
      fetchUsers();
      fetchReviews();
      fetchMessages();
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

  // Delete Booking
  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking permanently?')) return;
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        alert('Booking deleted successfully.');
      } else {
        alert(data.message || 'Failed to delete booking.');
      }
    } catch (err) {
      console.error(err);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      alert('Booking deleted locally in demonstration mode.');
    }
  };

  // Update User Role
  const handleUpdateUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (userId === user?._id) {
      alert('You cannot change your own admin role.');
      return;
    }
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    try {
      const res = await fetch(`${API_URL}/auth/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsersList((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
        alert('User role updated successfully.');
      } else {
        alert(data.message || 'Failed to update user role.');
      }
    } catch (err) {
      console.error(err);
      setUsersList((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      alert('User role updated locally in demonstration mode.');
    }
  };

  // Delete User
  const handleDeleteUser = async (userId: string) => {
    if (userId === user?._id) {
      alert('You cannot delete your own administrator account.');
      return;
    }
    if (!confirm('Are you sure you want to delete this user permanently?')) return;
    try {
      const res = await fetch(`${API_URL}/auth/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsersList((prev) => prev.filter((u) => u._id !== userId));
        alert('User deleted successfully.');
      } else {
        alert(data.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error(err);
      setUsersList((prev) => prev.filter((u) => u._id !== userId));
      alert('User deleted locally in demonstration mode.');
    }
  };

  // Delete Review
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review permanently?')) return;
    try {
      const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        alert('Review deleted successfully.');
      } else {
        alert(data.message || 'Failed to delete review.');
      }
    } catch (err) {
      console.error(err);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      alert('Review deleted locally in demonstration mode.');
    }
  };

  // Delete Message
  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message permanently?')) return;
    try {
      const res = await fetch(`${API_URL}/messages/${messageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== messageId));
        alert('Message deleted successfully.');
      } else {
        alert(data.message || 'Failed to delete message.');
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
      alert('Message deleted locally in demonstration mode.');
    }
  };

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

  if (loading) return <div style={{ padding: '8rem 0' }}><Spinner /></div>;

  if (!user || user.role !== 'admin') {
    return (
      <div className={styles.adminLoginContainer}>
        <div className={`${styles.adminLoginCard} glass-panel`}>
          <div className={styles.adminLoginHeader}>
            <h2>Admin Portal</h2>
            <p>Access requires administrator authorization.</p>
          </div>

          {adminError && <div className={styles.errorBanner}>{adminError}</div>}

          <form onSubmit={handleAdminLoginSubmit} className={styles.adminLoginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username / Email</label>
              <input
                id="username"
                type="text"
                required
                className="form-input"
                placeholder="e.g. shubham@123456"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                className="form-input"
                placeholder="••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-glow" disabled={loggingInAdmin} style={{ width: '100%' }}>
              {loggingInAdmin ? 'Authorizing...' : 'Log In As Admin'}
            </button>
          </form>

          <div className={styles.hintText}>
            Hint: Use <strong>shubham@123456</strong> and password <strong>009524</strong>
          </div>
        </div>
      </div>
    );
  }

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
        <div 
          className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Manage Users ({usersList.length})
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Manage Reviews ({reviews.length})
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'messages' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          User Messages ({messages.length})
        </div>
      </div>

      {/* Main Tables */}
      <section className="glass-panel" style={{ padding: '0.25rem' }}>
        {activeTab === 'bookings' && (
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
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>${booking.totalPrice}</td>
                      <td>
                        <span className={`badge badge-${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionGroup}>
                          {booking.status === 'pending' && (
                            <>
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
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(booking._id)}
                            className={`${styles.actionBtn} ${styles.actionBtnCancel} ${styles.actionBtnDelete}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No traveler bookings found.</p>
          )
        )}

        {activeTab === 'tours' && (
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

        {activeTab === 'users' && (
          loadingUsers ? (
            <Spinner />
          ) : usersList.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email / Handle</th>
                    <th>Role</th>
                    <th>Joined At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((usr) => (
                    <tr key={usr._id}>
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{usr.name}</td>
                      <td>{usr.email}</td>
                      <td>
                        <span className={`badge ${usr.role === 'admin' ? 'badge-confirmed' : 'badge-pending'}`}>
                          {usr.role}
                        </span>
                      </td>
                      <td>{new Date(usr.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className={styles.actionGroup}>
                          <button
                            onClick={() => handleUpdateUserRole(usr._id, usr.role)}
                            className={styles.actionBtn}
                            style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary-glow)' }}
                            disabled={usr._id === user?._id}
                          >
                            Toggle Role
                          </button>
                          <button
                            onClick={() => handleDeleteUser(usr._id)}
                            className={`${styles.actionBtn} ${styles.actionBtnCancel} ${styles.actionBtnDelete}`}
                            disabled={usr._id === user?._id}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users found in database.</p>
          )
        )}

        {activeTab === 'reviews' && (
          loadingReviews ? (
            <Spinner />
          ) : reviews.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Reviewer</th>
                    <th>Tour Package</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((rev) => (
                    <tr key={rev._id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{rev.user?.name || 'Deleted User'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.user?.email || ''}</div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{rev.tour?.title || 'Unknown Tour'}</td>
                      <td style={{ fontWeight: 700, color: 'var(--accent-warning)' }}>★ {rev.rating}</td>
                      <td style={{ maxWidth: '300px', wordBreak: 'break-word', fontSize: '0.85rem' }}>"{rev.reviewText}"</td>
                      <td>{new Date(rev.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
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
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No traveler reviews found.</p>
          )
        )}

        {activeTab === 'messages' && (
          loadingMessages ? (
            <Spinner />
          ) : messages.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message Details</th>
                    <th>Submitted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg._id}>
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td style={{ fontWeight: 600 }}>{msg.subject}</td>
                      <td style={{ maxWidth: '350px', wordBreak: 'break-word', fontSize: '0.85rem' }}>{msg.message}</td>
                      <td>{new Date(msg.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
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
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No customer messages found.</p>
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
