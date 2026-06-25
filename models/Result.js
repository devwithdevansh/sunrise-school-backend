const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  academicYear: {
    type: String,
    required: true
  },
  classLevel: {
    type: String,
    required: true,
    enum: ['10 EM', '10 GM', '12 Commerce']
  },
  imageSrc: {
    type: String,
    required: true
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);
