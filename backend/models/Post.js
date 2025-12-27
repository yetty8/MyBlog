const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: String,
  content: {
    type: String,
    required: [true, 'Please add some content']
  },
  tags: {
    type: [String],
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }],
  featuredImage: String,
  readTime: Number
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title
PostSchema.pre('save', function(next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  next();
});

// Calculate read time before saving
PostSchema.pre('save', function(next) {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  next();
});

// Create text index for search
PostSchema.index(
  { 
    title: 'text', 
    content: 'text', 
    tags: 'text' 
  },
  {
    weights: {
      title: 10,
      tags: 5,
      content: 1
    },
    name: 'text_search_index'
  }
);

module.exports = mongoose.model('Post', PostSchema);