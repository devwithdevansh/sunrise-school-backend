const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getStaff, 
  createStaff, 
  updateStaff, 
  deleteStaff 
} = require('../controllers/staffController');

const router = express.Router();

// Routes
router.get('/', getStaff);
router.post('/', protect, createStaff);
router.put('/:id', protect, updateStaff);
router.delete('/:id', protect, deleteStaff);

module.exports = router;
