const express = require('express');
const {
    registerUser,
    loginUser,
    verifyOtp,
    resendOtp
} = require('../controllers/auth'); // Adjust the path according to your project structure

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for OTP verification
router.post('/verify-otp', verifyOtp);

// Route for resending OTP
router.post('/resend-otp', resendOtp);

module.exports = router;
