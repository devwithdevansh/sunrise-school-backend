const Staff = require('../models/Staff');

// @desc    Get all staff
// @route   GET /api/staff
// @access  Public
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ isManagement: -1, order: 1 });
    res.status(200).json({
      status: 'success',
      count: staff.length,
      data: staff
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Add new staff member
// @route   POST /api/staff
// @access  Private/Admin
exports.createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json({
      status: 'success',
      data: staff
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private/Admin
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!staff) {
      return res.status(404).json({ status: 'fail', message: 'Staff member not found' });
    }

    res.status(200).json({
      status: 'success',
      data: staff
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private/Admin
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({ status: 'fail', message: 'Staff member not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Staff member removed'
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
