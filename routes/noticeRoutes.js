const express = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { 
  getNotices, 
  createNotice, 
  updateNotice, 
  deleteNotice 
} = require('../controllers/noticeController');

const router = express.Router();

// Validation Schema
const noticeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  category: z.enum(['General', 'Exams', 'Events', 'Academics', 'Holidays']),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  isPinned: z.boolean().optional(),
  attachment: z.object({
    name: z.string().nullable().optional(),
    size: z.string().nullable().optional(),
    url: z.string().nullable().optional()
  }).nullable().optional(),
  date: z.string()
});

// Routes
router.get('/', getNotices);                                         // PUBLIC: used by school website
router.post('/', protect, validate(noticeSchema), createNotice);      // PROTECTED: admin only
router.put('/:id', protect, validate(noticeSchema.partial()), updateNotice); // PROTECTED: admin only
router.delete('/:id', protect, deleteNotice);                        // PROTECTED: admin only

module.exports = router;
