const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');

const { adminLimiter, loginLimiter } = require('../middleware/rateLimiter');
const validate                       = require('../middleware/validate');
const {
  updateLoungeValidation,
  updateBookingStatusValidation,
} = require('../middleware/validators');

const { login }                             = require('../controllers/adminAuthController');
const { listLounges, updateLounge }         = require('../controllers/adminLoungesController');
const { listBookings, updateBookingStatus } = require('../controllers/adminBookingsController');
const { getStats }                          = require('../controllers/adminStatsController');

// ── Auth (unprotected, rate-limited to 10 attempts / 15m) ─────────────────────
router.post('/login', loginLimiter, login);

// ── All routes below require valid JWT & general admin rate limiting ─────────
router.use(adminLimiter);
router.use(adminAuth);

// Stats
router.get('/stats', getStats);

// Lounges
router.get('/lounges',        listLounges);
router.patch('/lounges/:id',  updateLoungeValidation, validate, updateLounge);

// Bookings
router.get('/bookings',              listBookings);
router.patch('/bookings/:id/status', updateBookingStatusValidation, validate, updateBookingStatus);

module.exports = router;
