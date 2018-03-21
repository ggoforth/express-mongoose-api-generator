'use strict';

const mongoose = require('mongoose');

/**
 * Our User Schema.
 */
const LunchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {type: Date, default: Date.now}
});

/**
 * Register the model with mongoose.
 */
mongoose.model('Lunch', LunchSchema);