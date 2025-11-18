import express from "express";
import Comment from "../models/Comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add a comment to a post
router.post("/:postId", auth, async (req, res) => {
  try {
    const newComment = new Comment({
      content: req.body.content,
      post: req.params.postId,
      author: req.user.id,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate("author", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
