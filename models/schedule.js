'use strict';

const mongoose = require('mongoose');

/**
 * Our User Schema.
 */
const ScheduleSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true
  },
  classList: [{
    roomNumber: Number,
    teacher: String
  }],
  createdAt: {type: Date, default: Date.now}
});

/**
 * Register the model with mongoose.
 */
mongoose.model('Schedule', ScheduleSchema);