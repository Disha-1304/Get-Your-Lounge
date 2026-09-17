const express = require('express');
const router  = express.Router();

const authenticateUser       = require('../middleware/authenticateUser');
const { apiLimiter }          = require('../middleware/rateLimiter');
const validate               = require('../middleware/validate');
const { createUserValidation } = require('../middleware/validators');

const { createUser, getUserBookings } = require('../controllers/usersController');

// Apply rate limiter to all user endpoints
router.use(apiLimiter);

// POST /api/users
router.post('/', createUserValidation, validate, createUser);

// GET /api/users/:userId/bookings (Protected by identity handoff JWT)
router.get('/:userId/bookings', authenticateUser, getUserBookings);

module.exports = router;
