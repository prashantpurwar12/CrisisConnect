const express = require('express');
const router = express.Router();
const { otpLimiter } = require('../middleware/rateLimiter');

// Import the register, login, sendOtp, and verifyOtp functions
const { register, login, sendOtp, verifyOtp } = require('../controllers/authController');

// Route for user registration
// This will handle POST requests to /api/auth/register
router.post('/register', register);

// Route for user login
// This will handle POST requests to /api/auth/login
router.post('/login', login);

// Route for sending OTP (Protected by otpLimiter)
router.post('/send-otp', otpLimiter, sendOtp);

// Route for verifying OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;