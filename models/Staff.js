const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  image: {
    type: String,
    default: '/assets/placeholder-avatar.png'
  },
  bio: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  isManagement: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);
