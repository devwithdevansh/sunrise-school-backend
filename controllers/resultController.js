const Result = require('../models/Result');

// @desc    Get all results
// @route   GET /api/results
// @access  Public
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ isArchived: false }).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: results
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Add new result
// @route   POST /api/results
// @access  Private/Admin
exports.createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private/Admin
exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!result) return res.status(404).json({ status: 'fail', message: 'Result not found' });
    
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete result
// @route   DELETE /api/results/:id
// @access  Private/Admin
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ status: 'fail', message: 'Result not found' });
    
    res.status(200).json({
      status: 'success',
      message: 'Result record deleted'
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
