import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global reset
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
  input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
`;
document.head.appendChild(style);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
