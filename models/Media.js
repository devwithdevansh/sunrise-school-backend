const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video', 'document'],
    default: 'image'
  },
  category: {
    type: String,
    required: true,
    enum: ['Events', 'Infrastructure', 'Sports', 'Classrooms', 'Other']
  },
  size: Number,
  dimensions: {
    width: Number,
    height: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);
