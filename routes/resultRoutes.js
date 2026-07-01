const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getResults, 
  createResult, 
  updateResult, 
  deleteResult 
} = require('../controllers/resultController');

const router = express.Router();

router.get('/', getResults);                    // PUBLIC: used by school website
router.post('/', protect, createResult);         // PROTECTED: admin only
router.put('/:id', protect, updateResult);       // PROTECTED: admin only
router.delete('/:id', protect, deleteResult);    // PROTECTED: admin only

module.exports = router;
