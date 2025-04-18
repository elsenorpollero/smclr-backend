const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP will automatically be deleted after 5 minutes (300 seconds)
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
