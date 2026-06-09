import React, { useState, useEffect } from 'react';
import DriverCard from '../components/DriverCard';
import { getAllDrivers, addDriver, updateDriverStatus, deleteDriver } from '../services/api';

const initialForm = {
  name: '', phone: '', vehicleModel: '', vehiclePlate: '',
};

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchDrivers = async () => {
    try {
      const res = await getAllDrivers();
      setDrivers(res.data.data);
    } catch {
      setError('Failed to load drivers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await addDriver(form);
      setSuccessMsg('Driver added successfully!');
      setForm(initialForm);
      setShowForm(false);
      fetchDrivers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add driver.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateDriverStatus(id, status);
      setSuccessMsg('Driver status updated.');
      fetchDrivers();
    } catch {
      setError('Failed to update driver status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this driver?')) return;
    try {
      await deleteDriver(id);
      setSuccessMsg('Driver removed.');
      fetchDrivers();
    } catch {
      setError('Failed to remove driver.');
    }
  };

  useEffect(() => {
    if (successMsg) { const t = setTimeout(() => setSuccessMsg(''), 3000); return () => clearTimeout(t); }
  }, [successMsg]);

  const available = drivers.filter(d => d.availabilityStatus === 'AVAILABLE').length;
  const busy = drivers.filter(d => d.availabilityStatus === 'BUSY').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Drivers</h1>
          <p style={styles.subtitle}>Manage driver fleet and availability</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Driver'}
        </button>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        {[
          { label: 'Total', value: drivers.length, color: '#6366f1' },
          { label: 'Available', value: available, color: '#22c55e' },
          { label: 'Busy', value: busy, color: '#eab308' },
          { label: 'Offline', value: drivers.length - available - busy, color: '#94a3b8' },
        ].map(s => (
          <div key={s.label} style={styles.statCard}>
            <span style={{ ...styles.statNum, color: s.color }}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {error && <div style={styles.alertErr}>{error}</div>}
      {successMsg && <div style={styles.alertOk}>{successMsg}</div>}

      {/* Add Driver Form */}
      {showForm && (
        <form onSubmit={handleAddDriver} style={styles.form}>
          <h3 style={styles.formTitle}>New Driver</h3>
          <div style={styles.formGrid}>
            {[
              { key: 'name', label: 'Full Name', placeholder: 'e.g. Ashan Perera' },
              { key: 'phone', label: 'Phone Number', placeholder: 'e.g. 0771234567' },
              { key: 'vehicleModel', label: 'Vehicle Model', placeholder: 'e.g. Toyota Prius' },
              { key: 'vehiclePlate', label: 'Vehicle Plate', placeholder: 'e.g. CAB-1234' },
            ].map(f => (
              <div key={f.key} style={styles.field}>
                <label style={styles.fieldLabel}>{f.label}</label>
                <input
                  style={styles.input}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" style={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Driver'}
          </button>
        </form>
      )}

      {/* Driver Grid */}
      {loading ? (
        <div style={styles.loading}>Loading drivers...</div>
      ) : drivers.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>🚗</p>
          <p>No drivers yet. Add your first driver above.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {drivers.map(driver => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: '0' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  title: { margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b' },
  subtitle: { margin: '4px 0 0', color: '#64748b', fontSize: '14px' },
  addBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', border: 'none',
    borderRadius: '10px', fontWeight: '600',
    fontSize: '14px', cursor: 'pointer',
  },
  statsRow: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' },
  statCard: {
    flex: '1', minWidth: '80px',
    background: '#fff',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    border: '1px solid #f1f5f9',
    display: 'flex', flexDirection: 'column', gap: '4px',
  },
  statNum: { fontSize: '28px', fontWeight: '700' },
  statLabel: { fontSize: '12px', color: '#94a3b8', fontWeight: '500' },
  alertErr: { background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px' },
  alertOk: { background: '#dcfce7', color: '#16a34a', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px' },
  form: {
    background: '#fff',
    borderRadius: '14px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    border: '1px solid #f1f5f9',
  },
  formTitle: { margin: '0 0 18px', fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  fieldLabel: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: {
    padding: '10px 12px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  submitBtn: {
    padding: '11px 28px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', border: 'none',
    borderRadius: '10px', fontWeight: '600',
    fontSize: '14px', cursor: 'pointer',
  },
  loading: { textAlign: 'center', color: '#94a3b8', padding: '40px' },
  empty: { textAlign: 'center', color: '#94a3b8', padding: '60px 20px' },
  emptyIcon: { fontSize: '40px', marginBottom: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
};

export default DriversPage;
