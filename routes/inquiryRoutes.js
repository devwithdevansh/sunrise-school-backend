const express = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  submitInquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry
} = require('../controllers/inquiryController');

const router = express.Router();

// Validation Schema
const inquirySchema = z.object({
  studentName: z.string().min(2, 'Name is too short'),
  parentName: z.string().min(2, 'Name is too short'),
  phone: z.string().regex(/^[0-9+\s-]{10,15}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  class: z.string(),
  message: z.string().min(5, 'Message is too short'),
  status: z.enum(['New', 'Replied', 'Closed']).optional()
});

// Routes
router.post('/', validate(inquirySchema), submitInquiry); // PUBLIC: school website inquiry form
router.get('/', protect, getInquiries);                   // PROTECTED: admin only
router.patch('/:id', protect, updateInquiry);             // PROTECTED: admin only
router.delete('/:id', protect, deleteInquiry);            // PROTECTED: admin only

module.exports = router;
