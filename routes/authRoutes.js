const express = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');

const router = express.Router();

const loginSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters')
});

router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
