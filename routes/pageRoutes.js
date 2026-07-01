const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getPages, 
  getPageBySlug, 
  updatePageContent 
} = require('../controllers/pageController');

const router = express.Router();

// Routes
router.get('/', protect, getPages);
router.get('/:slug', getPageBySlug);
router.put('/:slug', protect, updatePageContent);

module.exports = router;
