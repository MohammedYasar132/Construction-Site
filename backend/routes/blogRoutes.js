const express = require('express');
const router = express.Router();
const { getBlogs, createBlog } = require('../controllers/blogController');

router.route('/')
  .get(getBlogs)
  .post(createBlog);

module.exports = router;
