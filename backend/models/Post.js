import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, default: "Admin" },
  content: { type: String, required: true },
  image: { type: String, default: "" },
  tags: { type: [String], default: [] }
}, { timestamps: true });

// Auto-generate slug from title  
PostSchema.pre("validate", function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export default mongoose.model("Post", PostSchema);
