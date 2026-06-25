const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a notice title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['General', 'Exams', 'Events', 'Academics', 'Holidays']
  },
  content: {
    type: String,
    required: [true, 'Please add notice content']
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  attachment: {
    name: { type: String, default: null },
    size: { type: String, default: null }
  },
  date: {
    type: String,
    required: [true, 'Please specify a date']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notice', noticeSchema);
