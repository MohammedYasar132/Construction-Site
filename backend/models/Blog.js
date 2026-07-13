const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add blog content'],
  },
  author: {
    type: String,
    required: [true, 'Please add an author name'],
    default: 'Admin',
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add a blog image URL'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
