const express = require('express');
const router  = express.Router();

const authenticateUser = require('../middleware/authenticateUser');
const { apiLimiter }    = require('../middleware/rateLimiter');
const validate         = require('../middleware/validate');
const {
  createBookingValidation,
  cancelBookingValidation,
  updateBookingStatusValidation,
} = require('../middleware/validators');

const {
  createBooking,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
} = require('../controllers/bookingsController');

// Apply rate limiting to all booking endpoints
router.use(apiLimiter);

// ── User-facing endpoints ────────────────────────────────────────────────────
// POST /api/bookings (Protected by identity handoff JWT)
router.post('/', authenticateUser, createBookingValidation, validate, createBooking);

// GET /api/bookings/:id (Get single booking)
router.get('/:id', getBookingById);

// PATCH /api/bookings/:id/cancel (User-facing cancellation, protected by identity handoff JWT)
router.patch('/:id/cancel', authenticateUser, cancelBookingValidation, validate, cancelBooking);

// ── Admin-facing status update endpoint ──────────────────────────────────────
// PATCH /api/bookings/:id/status
router.patch('/:id/status', updateBookingStatusValidation, validate, updateBookingStatus);

module.exports = router;
