import Comment from "../models/Comment.js";

// Get all comments for a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate("author", "username");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create comment
export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
