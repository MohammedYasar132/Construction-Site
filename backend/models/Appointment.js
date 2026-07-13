const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  service: {
    type: String,
    required: [true, 'Please select a service category'],
    enum: [
      'Residential Construction',
      'Commercial Construction',
      'Industrial Construction',
      'Apartment Construction',
      'Villa Construction',
      'Home Renovation',
      'Home Extension',
      'Interior Design',
      'Exterior Design',
      'Architecture Planning',
      'Structural Engineering',
      'Construction Consultation',
      'Turnkey Construction',
      'Building Maintenance',
      'Civil Engineering',
      'Waterproofing',
      'Plumbing',
      'Electrical Works',
      'False Ceiling',
      'Flooring',
      'Painting',
      'Roofing',
      'Landscaping',
      'Modular Kitchen',
      'Bathroom Renovation',
      'Smart Home Solutions',
      'Site Inspection',
      'Project Management',
      'Cost Estimation',
      '3D Design & Visualization',
      'Custom Construction',
      'Other'
    ]
  },
  message: {
    type: String,
    required: [true, 'Please add a message or description of requirements'],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
