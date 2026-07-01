const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getAcademicYears,
  addAcademicYear,
  deleteAcademicYear
} = require('../controllers/academicYearController');

const router = express.Router();

router.get('/', getAcademicYears);                      // PUBLIC: frontend can access
router.post('/', protect, addAcademicYear);             // PROTECTED: admin only
router.delete('/:id', protect, deleteAcademicYear);     // PROTECTED: admin only

module.exports = router;
