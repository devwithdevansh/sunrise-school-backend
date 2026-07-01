const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const uploadAttachment = require('../middleware/uploadAttachment');
const { protect } = require('../middleware/auth');

router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
    }
    
    res.status(200).json({
      status: 'success',
      url: req.file.path // This is the secure Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/attachment', protect, (req, res) => {
  uploadAttachment.single('file')(req, res, (err) => {
    if (err) {
      // Multer or Cloudinary error
      console.error('Upload error:', err);
      return res.status(400).json({ 
        status: 'fail', 
        message: err.message || 'File upload failed',
        details: err.code || ''
      });
    }

    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded. Make sure the field name is "file".' });
    }
    
    res.status(200).json({
      status: 'success',
      url: req.file.path,
      public_id: req.file.filename
    });
  });
});

module.exports = router;
