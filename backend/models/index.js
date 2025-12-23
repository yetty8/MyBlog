// backend/models/index.js
const mongoose = require('mongoose');

// Load models
require('./User');
require('./Post');
require('./Comment');

module.exports = mongoose;