const Inquiry = require('../models/Inquiry');

// @desc    Submit new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Inquiry submitted successfully. Our team will contact you soon.',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update inquiry status
// @route   PATCH /api/inquiries/:id
// @access  Private/Admin
exports.updateInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!inquiry) {
      return res.status(404).json({ status: 'fail', message: 'Inquiry not found' });
    }

    res.status(200).json({
      status: 'success',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ status: 'fail', message: 'Inquiry not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Inquiry removed from system'
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
