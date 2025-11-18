import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/Post.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const posts = [
  {
    title: "Welcome to My Blog",
    content: "This is the first post on my blogging platform. Stay tuned for more!",
    image: "https://via.placeholder.com/600x400",
    tags: ["Welcome", "Introduction"],
  },
  {
    title: "Tech Trends 2025",
    content: "Exploring the latest trends in technology that will shape 2025.",
    image: "https://via.placeholder.com/600x400",
    tags: ["Technology", "Trends"],
  },
  {
    title: "Healthy Lifestyle Tips",
    content: "Simple daily habits to improve your mental and physical health.",
    image: "https://via.placeholder.com/600x400",
    tags: ["Lifestyle", "Health"],
  },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected. Seeding posts...");
    await Post.deleteMany(); // Optional: clear existing posts
    await Post.insertMany(posts);
    console.log("Seeding completed!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
