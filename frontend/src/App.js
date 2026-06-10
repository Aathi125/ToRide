import React, { useState } from 'react';
import DriversPage from './pages/DriversPage';
import BookingPage from './pages/BookingPage';

function App() {
  const [activePage, setActivePage] = useState('booking');

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>🚀</span>
          <div>
            <p style={styles.brandName}>RideSwift</p>
            <p style={styles.brandTagline}>Ride Booking System</p>
          </div>
        </div>

        <nav style={styles.nav}>
          {[
            { id: 'booking', icon: '🚗', label: 'Book a Ride' },
            { id: 'drivers', icon: '👥', label: 'Drivers' },
          ].map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activePage === item.id ? styles.navItemActive : {}),
              }}
              onClick={() => setActivePage(item.id)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <p style={styles.footerText}>NextGen Innovations</p>
          <p style={styles.footerSub}>Internship Assessment</p>
        </div>
      </aside>


      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.content}>
          {activePage === 'booking' && <BookingPage />}
          {activePage === 'drivers' && <DriversPage />}
        </div>
      </main>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  sidebar: {
    width: '240px',
    background: '#1e293b',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    position: 'sticky',
    top: 0,
    height: '100vh',
    flexShrink: 0,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    padding: '4px 8px',
  },
  brandIcon: { fontSize: '28px' },
  brandName: { margin: 0, color: '#f8fafc', fontWeight: '700', fontSize: '17px' },
  brandTagline: { margin: '2px 0 0', color: '#64748b', fontSize: '11px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '11px 14px',
    borderRadius: '10px',
    border: 'none',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s',
  },
  navItemActive: {
    background: 'rgba(99, 102, 241, 0.15)',
    color: '#a5b4fc',
  },
  navIcon: { fontSize: '16px', width: '20px', textAlign: 'center' },
  sidebarFooter: { marginTop: '20px', padding: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' },
  footerText: { margin: 0, color: '#64748b', fontSize: '12px', fontWeight: '600' },
  footerSub: { margin: '2px 0 0', color: '#475569', fontSize: '11px' },
  main: { flex: 1, overflowY: 'auto' },
  content: { padding: '32px', maxWidth: '1100px' },
};

export default App;
