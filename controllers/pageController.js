const Page = require('../models/Page');

// @desc    Get all pages (metadata only)
// @route   GET /api/pages
// @access  Private/Admin
exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find().select('title slug lastUpdatedBy updatedAt');
    res.status(200).json({
      status: 'success',
      data: pages
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get single page by slug
// @route   GET /api/pages/:slug
// @access  Public
exports.getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });

    if (!page) {
      return res.status(404).json({ status: 'fail', message: 'Page not found' });
    }

    res.status(200).json({
      status: 'success',
      data: page
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update page content
// @route   PUT /api/pages/:slug
// @access  Private/Admin
exports.updatePageContent = async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { 
        sections: req.body.sections,
        lastUpdatedBy: req.user.name || 'Admin'
      },
      { new: true, runValidators: true }
    );

    if (!page) {
      return res.status(404).json({ status: 'fail', message: 'Page not found' });
    }

    res.status(200).json({
      status: 'success',
      data: page
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
