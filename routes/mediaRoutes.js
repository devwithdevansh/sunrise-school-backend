const express = require('express');
const { protect } = require('../middleware/auth');
const { getAllMedia, saveMedia, deleteMedia } = require('../controllers/mediaController');

const router = express.Router();

router.get('/', getAllMedia);
router.post('/', protect, saveMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;
