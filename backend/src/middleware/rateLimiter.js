/**
 * rateLimiter.js
 * ────────────────────────────────────────────────────────────
 * Configurable rate limiters for public, user, and admin APIs.
 *
 * ENV variables:
 *   RATE_LIMIT_WINDOW_MS       — window in ms for public/user API (default: 15 mins = 900000)
 *   RATE_LIMIT_MAX             — max requests per window for public/user API (default: 100)
 *   ADMIN_RATE_LIMIT_WINDOW_MS — window in ms for admin API (default: 15 mins = 900000)
 *   ADMIN_RATE_LIMIT_MAX       — max requests per window for admin API (default: 200)
 */

const rateLimit = require('express-rate-limit');

// Rate limiter for public and user-facing endpoints (/api/lounges, /api/bookings, /api/users)
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests from this IP address, please try again later.',
  },
});

// Rate limiter for general admin endpoints (/api/admin/*)
const adminLimiter = rateLimit({
  windowMs: parseInt(process.env.ADMIN_RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.ADMIN_RATE_LIMIT_MAX || '200', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many admin requests from this IP, please try again later.',
  },
});

// Stricter rate limiter for admin login endpoint (/api/admin/login)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many failed login attempts, please try again after 15 minutes.',
  },
});

module.exports = { apiLimiter, adminLimiter, loginLimiter };
