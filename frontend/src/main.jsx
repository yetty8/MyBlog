// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { logWebVitals, measurePageLoad } from './utils/performance';
import { initAnalytics } from './utils/analytics';

// Initialize performance monitoring
measurePageLoad();

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize analytics after render
initAnalytics();

// Web Vitals reporting
// In src/main.jsx
if (import.meta.env.DEV) {
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS(console.log);
    onFID(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  });
}