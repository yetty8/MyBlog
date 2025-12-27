// src/utils/performance.js
export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const timing = window.performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page loaded in ${pageLoadTime}ms`);
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'page_load',
          value: pageLoadTime,
          event_category: 'Performance'
        });
      }
    });
  }
};

export const logWebVitals = (metric) => {
  console.log(metric);
  // You can send these metrics to an analytics service
  // Example: sendToAnalytics(metric);
};