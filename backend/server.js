// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import postsRoute from "./routes/posts.js";
import authRoutes from './routes/auth.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server port
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Blog API' });
});

// Routes
app.use("/posts", postsRoute);
app.use('/api/auth', authRoutes);

// MongoDB connection
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    // Start the server only after MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });