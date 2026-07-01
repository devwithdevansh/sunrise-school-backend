const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ isPinned: -1, publishDate: -1 });
    res.status(200).json({
      status: 'success',
      count: notices.length,
      data: notices
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Create new notice
// @route   POST /api/notices
// @access  Private/Admin
exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({
      status: 'success',
      data: notice
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private/Admin
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!notice) {
      return res.status(404).json({ status: 'fail', message: 'Notice not found' });
    }

    res.status(200).json({
      status: 'success',
      data: notice
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private/Admin
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ status: 'fail', message: 'Notice not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
