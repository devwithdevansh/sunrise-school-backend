const AcademicYear = require('../models/AcademicYear');

// @desc    Get all academic years
// @route   GET /api/academic-years
// @access  Public
exports.getAcademicYears = async (req, res) => {
  try {
    // Sort descending so the latest year comes first
    const years = await AcademicYear.find().sort({ year: -1 });
    res.status(200).json({
      status: 'success',
      count: years.length,
      data: years
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Add new academic year
// @route   POST /api/academic-years
// @access  Private/Admin
exports.addAcademicYear = async (req, res) => {
  try {
    const { year } = req.body;
    if (!year) {
      return res.status(400).json({ status: 'fail', message: 'Academic year is required' });
    }

    const academicYear = await AcademicYear.create({ year });
    res.status(201).json({
      status: 'success',
      data: academicYear
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ status: 'error', message: 'Academic year already exists' });
    }
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete an academic year
// @route   DELETE /api/academic-years/:id
// @access  Private/Admin
exports.deleteAcademicYear = async (req, res) => {
  try {
    const year = await AcademicYear.findByIdAndDelete(req.params.id);

    if (!year) {
      return res.status(404).json({ status: 'fail', message: 'Academic year not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Academic year deleted'
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
