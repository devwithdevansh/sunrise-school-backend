const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  sections: [
    {
      id: String,
      label: String,
      fields: [
        {
          id: String,
          label: String,
          type: {
            type: String,
            enum: ['text', 'textarea', 'image'],
            default: 'text'
          },
          value: String
        }
      ]
    }
  ],
  lastUpdatedBy: {
    type: String,
    default: 'System'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);
