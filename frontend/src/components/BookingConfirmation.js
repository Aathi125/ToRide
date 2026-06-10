import React from 'react';

function BookingConfirmation({ booking, onClose, onComplete }) {
  if (!booking) return null;

  
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.successIcon}>✓</div>
        <h2 style={styles.title}>Ride Confirmed!</h2>
        <p style={styles.subtitle}>Your driver is on the way</p>

        <div style={styles.bookingId}>
          Booking #{booking.id}
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Trip Details</h4>
          <div style={styles.row}>
            <span style={styles.label}>📍 Pickup</span>
            <span style={styles.value}>{booking.pickupLocation}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>🏁 Dropoff</span>
            <span style={styles.value}>{booking.dropoffLocation}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>👤 Passenger</span>
            <span style={styles.value}>{booking.passengerName}</span>
          </div>
        </div>

        <div style={styles.driverSection}>
          <h4 style={styles.sectionTitle}>Assigned Driver</h4>
          <div style={styles.driverCard}>
            <div style={styles.driverAvatar}>
              {booking.driver?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={styles.driverName}>{booking.driver?.name}</p>
              <p style={styles.driverSub}>{booking.driver?.phone}</p>
              <p style={styles.driverSub}>
                🚗 {booking.driver?.vehicleModel} · {booking.driver?.vehiclePlate}
              </p>
            </div>
            <div style={styles.ratingBadge}>
              ⭐ {booking.driver?.rating?.toFixed(1)}
            </div>
          </div>
        </div>

        <div style={styles.btnGroup}>
          <button style={styles.btnComplete} onClick={() => onComplete(booking.id)}>
            Complete Ride
          </button>
          <button style={styles.btnClose} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(15,23,42,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '20px',
  },
  modal: {
    background: '#fff',
    borderRadius: '20px',
    padding: '36px 32px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  successIcon: {
    width: '64px', height: '64px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '28px', color: '#fff', fontWeight: '700',
    margin: '0 auto 16px',
  },
  title: { margin: '0 0 6px', fontSize: '22px', fontWeight: '700', color: '#1e293b' },
  subtitle: { margin: '0 0 16px', color: '#64748b', fontSize: '14px' },
  bookingId: {
    display: 'inline-block',
    background: '#f0fdf4',
    color: '#16a34a',
    borderRadius: '999px',
    padding: '4px 16px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  section: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '14px',
    textAlign: 'left',
  },
  sectionTitle: {
    margin: '0 0 10px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '10px' },
  label: { fontSize: '13px', color: '#64748b', flexShrink: 0 },
  value: { fontSize: '13px', color: '#1e293b', fontWeight: '500', textAlign: 'right' },
  driverSection: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  driverCard: { display: 'flex', alignItems: 'center', gap: '12px' },
  driverAvatar: {
    width: '46px', height: '46px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '18px', flexShrink: 0,
  },
  driverName: { margin: '0 0 2px', fontWeight: '600', fontSize: '15px', color: '#1e293b' },
  driverSub: { margin: '0 0 2px', fontSize: '12px', color: '#94a3b8' },
  ratingBadge: {
    marginLeft: 'auto',
    background: '#fef9c3',
    color: '#ca8a04',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    flexShrink: 0,
  },
  btnGroup: { display: 'flex', gap: '10px' },
  btnComplete: {
    flex: 1, padding: '12px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', border: 'none',
    borderRadius: '10px', fontWeight: '600',
    fontSize: '14px', cursor: 'pointer',
  },
  btnClose: {
    flex: 1, padding: '12px',
    background: '#f1f5f9', color: '#64748b',
    border: 'none', borderRadius: '10px',
    fontWeight: '600', fontSize: '14px', cursor: 'pointer',
  },
};

export default BookingConfirmation;
