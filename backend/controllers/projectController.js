const Project = require('../models/Project');

// @desc    Get all projects or filter by category
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    const projects = await Project.find(query);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (For demo purposes; typically admin protected)
const createProject = async (req, res, next) => {
  try {
    const { title, category, location, description, imageUrl, featured } = req.body;
    
    if (!title || !category || !location || !description || !imageUrl) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const project = await Project.create({
      title,
      category,
      location,
      description,
      imageUrl,
      featured: !!featured,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
};
