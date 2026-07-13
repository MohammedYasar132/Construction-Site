const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controllers/appointmentController');

router.route('/')
  .post(createAppointment)
  .get(getAppointments);

module.exports = router;
