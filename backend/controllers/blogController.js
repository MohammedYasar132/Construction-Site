const Blog = require('../models/Blog');

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Public (For demo; typically admin restricted)
const createBlog = async (req, res, next) => {
  try {
    const { title, content, author, imageUrl } = req.body;

    if (!title || !content || !imageUrl) {
      res.status(400);
      throw new Error('Please fill in all required fields (title, content, imageUrl)');
    }

    const blog = await Blog.create({
      title,
      content,
      author: author || 'Admin',
      imageUrl,
    });

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  createBlog,
};
