// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import postsRoute from "./routes/posts.js";

const app = express();

// Allow ALL origins (fixes Postman 403)
app.use(cors());

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

// Posts route
app.use("/posts", postsRoute);

// MongoDB connection
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
