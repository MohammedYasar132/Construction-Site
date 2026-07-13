const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a project category'],
    enum: ['Commercial', 'Residential', 'Education', 'Office'],
  },
  location: {
    type: String,
    required: [true, 'Please add a project location'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a project short description'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add a project featured image URL'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  // Detailed fields for the project detail page
  fullDescription: {
    type: String,
  },
  objectives: {
    type: String,
  },
  challenges: {
    type: String,
  },
  solutions: {
    type: String,
  },
  client: {
    type: String,
    default: 'Private Developer',
  },
  startDate: {
    type: Date,
  },
  completionDate: {
    type: Date,
  },
  budget: {
    type: String,
  },
  technologies: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  galleryImages: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
