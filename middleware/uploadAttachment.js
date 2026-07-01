const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === 'application/pdf' || 
                  file.mimetype === 'application/msword' ||
                  file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    return {
      folder: 'sunrise_school_notices',
      resource_type: isPdf ? 'raw' : 'image'
    };
  }
});

const uploadAttachment = multer({ 
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB max file size
  }
});

module.exports = uploadAttachment;

