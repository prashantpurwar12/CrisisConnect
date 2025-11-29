const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000000, // Limit each IP to 10000000 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// More strict limiter for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Increased for development (was 5)
    message: {
        error: 'Too many login attempts from this IP, please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Incident reporting limiter
const incidentLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // Limit each IP to 10 incident reports in 5 minutes
    message: {
        error: 'Too many incident reports from this IP, please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// OTP Generation Limiter (Strict)
const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Increased for development (was 3)
    message: {
        error: 'Too many OTP requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    apiLimiter,
    authLimiter,
    incidentLimiter,
    otpLimiter
};