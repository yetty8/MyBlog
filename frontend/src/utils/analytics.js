// src/utils/analytics.js
export const initAnalytics = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.error('❌ Google Analytics: No Measurement ID provided');
    return;
  }

  // Debug info
  console.log('🔍 Initializing Google Analytics with ID:', measurementId);
  console.log('🌐 Current environment:', import.meta.env.MODE);

  if (typeof window.gtag === 'undefined') {
    console.error('❌ Google Analytics: gtag is not defined. Check if the Google tag is properly loaded.');
    return;
  }

  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    debug_mode: true, // Enable debug mode
    send_page_view: true
  });

  // Debug event
  window.gtag('event', 'analytics_initialized', {
    debug_mode: true,
    timestamp: new Date().toISOString()
  });

  console.log('✅ Google Analytics initialized successfully');
};

export const trackEvent = ({ action, category, label, value }) => {
  if (typeof window.gtag === 'function') {
    console.log('📊 Tracking event:', { action, category, label, value });
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      debug_mode: true
    });
  } else {
    console.warn('⚠️ gtag not available. Event not tracked:', { action, category, label, value });
  }
};