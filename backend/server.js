const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      console.log('\n🛑 Shutting down server...');
      server.close(async () => {
        console.log('Server closed');
        try {
          await mongoose.connection.close();
          console.log('MongoDB connection closed');
        } catch (err) {
          console.error('Error closing MongoDB connection:', err);
        }
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Only start the server if this file is run directly (not when imported for tests)
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };