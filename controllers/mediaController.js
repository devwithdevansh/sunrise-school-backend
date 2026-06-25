const Media = require('../models/Media');

// @desc    Get all media
// @route   GET /api/media
// @access  Public
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: media
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Upload/Save media info
// @route   POST /api/media
// @access  Private/Admin
exports.saveMedia = async (req, res) => {
  try {
    const media = await Media.create(req.body);
    res.status(201).json({
      status: 'success',
      data: media
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ status: 'fail', message: 'Media not found' });
    
    res.status(200).json({
      status: 'success',
      message: 'Media deleted'
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
