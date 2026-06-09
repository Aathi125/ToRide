import React, { useState, useEffect } from 'react';
import BookingConfirmation from '../components/BookingConfirmation';
import { getAvailableDrivers, createBooking, getAllBookings, updateBookingStatus } from '../services/api';

const initialForm = {
  passengerName: '', passengerPhone: '',
  pickupLocation: '', dropoffLocation: '',
};

const statusColors = {
  CONFIRMED: { bg: '#dbeafe', color: '#1d4ed8' },
  PENDING: { bg: '#fef9c3', color: '#ca8a04' },
  COMPLETED: { bg: '#dcfce7', color: '#16a34a' },
  CANCELLED: { bg: '#fee2e2', color: '#dc2626' },
};

function BookingPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bookingsRes, driversRes] = await Promise.all([
        getAllBookings(),
        getAvailableDrivers(),
      ]);
      setBookings(bookingsRes.data.data.reverse());
      setAvailableCount(driversRes.data.data.length);
    } catch {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await createBooking(form);
      setConfirmedBooking(res.data.data);
      setForm(initialForm);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateBookingStatus(id, 'COMPLETED');
      setConfirmedBooking(null);
      fetchData();
    } catch {
      setError('Failed to complete booking.');
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Book a Ride</h1>
          <p style={styles.subtitle}>
            {availableCount > 0
              ? `${availableCount} driver${availableCount > 1 ? 's' : ''} available now`
              : 'No drivers available right now'}
          </p>
        </div>
        <div style={{
          ...styles.availBadge,
          background: availableCount > 0 ? '#dcfce7' : '#fee2e2',
          color: availableCount > 0 ? '#16a34a' : '#dc2626',
        }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: availableCount > 0 ? '#22c55e' : '#ef4444',
            display: 'inline-block', marginRight: '6px',
          }} />
          {availableCount > 0 ? 'Available' : 'No Drivers'}
        </div>
      </div>

      {error && <div style={styles.alertErr}>{error}</div>}

      <div style={styles.layout}>
        {/* Booking Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>Trip Details</h3>

          <div style={styles.field}>
            <label style={styles.label}>Your Name</label>
            <input
              style={styles.input}
              placeholder="e.g. Kasun Silva"
              value={form.passengerName}
              onChange={e => setForm({ ...form, passengerName: e.target.value })}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              placeholder="e.g. 0771234567"
              value={form.passengerPhone}
              onChange={e => setForm({ ...form, passengerPhone: e.target.value })}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>📍 Pickup Location</label>
            <input
              style={styles.input}
              placeholder="e.g. Colombo Fort Station"
              value={form.pickupLocation}
              onChange={e => setForm({ ...form, pickupLocation: e.target.value })}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>🏁 Dropoff Location</label>
            <input
              style={styles.input}
              placeholder="e.g. Bandaranaike Airport"
              value={form.dropoffLocation}
              onChange={e => setForm({ ...form, dropoffLocation: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.bookBtn,
              opacity: (submitting || availableCount === 0) ? 0.6 : 1,
            }}
            disabled={submitting || availableCount === 0}
          >
            {submitting ? 'Finding your driver...' : availableCount === 0 ? 'No Drivers Available' : '🚗 Book Now'}
          </button>
        </form>

        {/* Booking History */}
        <div style={styles.historyPanel}>
          <h3 style={styles.formTitle}>Recent Bookings</h3>
          {loading ? (
            <p style={styles.muted}>Loading...</p>
          ) : bookings.length === 0 ? (
            <div style={styles.emptyHistory}>
              <p style={{ fontSize: '32px', marginBottom: '8px' }}>📋</p>
              <p style={styles.muted}>No bookings yet.</p>
            </div>
          ) : (
            <div style={styles.bookingList}>
              {bookings.map(b => {
                const sc = statusColors[b.status] || statusColors.PENDING;
                return (
                  <div key={b.id} style={styles.bookingItem}>
                    <div style={styles.bookingTop}>
                      <span style={styles.bookingId}>#{b.id}</span>
                      <span style={{ ...styles.statusBadge, ...sc }}>{b.status}</span>
                    </div>
                    <p style={styles.bookingName}>{b.passengerName}</p>
                    <p style={styles.bookingRoute}>
                      {b.pickupLocation} → {b.dropoffLocation}
                    </p>
                    {b.driver && (
                      <p style={styles.bookingDriver}>
                        🚗 {b.driver.name} · {b.driver.vehiclePlate}
                      </p>
                    )}
                    {b.status === 'CONFIRMED' && (
                      <button
                        style={styles.completeBtn}
                        onClick={() => handleComplete(b.id)}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {confirmedBooking && (
        <BookingConfirmation
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  title: { margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b' },
  subtitle: { margin: '4px 0 0', fontSize: '14px', color: '#64748b' },
  availBadge: { padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center' },
  alertErr: { background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  form: { background: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '16px' },
  formTitle: { margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '14px', color: '#1e293b', outline: 'none' },
  bookBtn: { padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginTop: '4px' },
  historyPanel: { background: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' },
  muted: { color: '#94a3b8', fontSize: '14px' },
  emptyHistory: { textAlign: 'center', padding: '40px 0' },
  bookingList: { display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' },
  bookingItem: { background: '#f8fafc', borderRadius: '10px', padding: '14px', border: '1px solid #f1f5f9' },
  bookingTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  bookingId: { fontSize: '12px', color: '#94a3b8', fontWeight: '600' },
  statusBadge: { padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' },
  bookingName: { margin: '0 0 4px', fontWeight: '600', fontSize: '14px', color: '#1e293b' },
  bookingRoute: { margin: '0 0 4px', fontSize: '13px', color: '#64748b' },
  bookingDriver: { margin: '0 0 8px', fontSize: '12px', color: '#94a3b8' },
  completeBtn: { padding: '5px 12px', background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: '7px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
};

export default BookingPage;
