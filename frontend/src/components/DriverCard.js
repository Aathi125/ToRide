import React from 'react';

const statusColors = {
  AVAILABLE: { bg: '#dcfce7', color: '#16a34a', dot: '#22c55e' },
  BUSY: { bg: '#fef9c3', color: '#ca8a04', dot: '#eab308' },
  OFFLINE: { bg: '#f1f5f9', color: '#64748b', dot: '#94a3b8' },
};

function DriverCard({ driver, onStatusChange, onDelete }) {
  const style = statusColors[driver.availabilityStatus] || statusColors.OFFLINE;

  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <div style={styles.avatar}>
          {driver.name.charAt(0).toUpperCase()}
        </div>
        <div style={styles.info}>
          <h3 style={styles.name}>{driver.name}</h3>
          <p style={styles.sub}>{driver.phone}</p>
        </div>
        <span style={{ ...styles.badge, background: style.bg, color: style.color }}>
          <span style={{ ...styles.dot, background: style.dot }} />
          {driver.availabilityStatus}
        </span>
      </div>

      <div style={styles.vehicleRow}>
        <span style={styles.vehicleIcon}>🚗</span>
        <span style={styles.vehicleText}>
          {driver.vehicleModel} · <strong>{driver.vehiclePlate}</strong>
        </span>
        <span style={styles.rating}>⭐ {driver.rating?.toFixed(1)}</span>
      </div>

      <div style={styles.actions}>
        {driver.availabilityStatus !== 'AVAILABLE' && (
          <button
            style={{ ...styles.btn, ...styles.btnGreen }}
            onClick={() => onStatusChange(driver.id, 'AVAILABLE')}
          >
            Set Available
          </button>
        )}
        {driver.availabilityStatus !== 'OFFLINE' && (
          <button
            style={{ ...styles.btn, ...styles.btnGray }}
            onClick={() => onStatusChange(driver.id, 'OFFLINE')}
          >
            Set Offline
          </button>
        )}
        <button
          style={{ ...styles.btn, ...styles.btnRed }}
          onClick={() => onDelete(driver.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px',
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: { margin: 0, fontSize: '15px', fontWeight: '600', color: '#1e293b' },
  sub: { margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' },
  badge: {
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexShrink: 0,
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
  },
  vehicleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f8fafc',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '13px',
    color: '#475569',
  },
  vehicleIcon: { fontSize: '16px' },
  vehicleText: { flex: 1 },
  rating: { color: '#f59e0b', fontWeight: '600' },
  actions: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  btn: {
    padding: '6px 14px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  btnGreen: { background: '#dcfce7', color: '#16a34a' },
  btnGray: { background: '#f1f5f9', color: '#64748b' },
  btnRed: { background: '#fee2e2', color: '#dc2626' },
};

export default DriverCard;
