const express = require('express');
const cors = require('cors');
const path = require('path');
const { securityHeaders, apiLimiter, sanitizeInput } = require('./middleware/security');
const postsRoute = require('./routes/posts');
const authRoutes = require('./routes/auth');

// Initialize Express app
const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(securityHeaders);
app.use(apiLimiter);
app.use(sanitizeInput);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// =====================
// Routes
// =====================
app.use('/api/posts', postsRoute);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// =====================
// Error Handling
// =====================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
require('./models');
module.exports = app;