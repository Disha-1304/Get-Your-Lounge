const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');

const { apiLimiter } = require('../middleware/rateLimiter');
const validate      = require('../middleware/validate');
const {
  createLoungeValidation,
  updateLoungeValidation,
} = require('../middleware/validators');

const {
  getAllLounges,
  getLoungeById,
  createLounge,
  updateLounge,
} = require('../controllers/loungesController');

// Apply rate limiter to all lounge endpoints
router.use(apiLimiter);

// Public browsing endpoints
router.get('/',    getAllLounges);    // GET  /api/lounges
router.get('/:id', getLoungeById);   // GET  /api/lounges/:id

// Admin management endpoints (protected by adminAuth)
router.post('/',     adminAuth, createLoungeValidation, validate, createLounge);   // POST /api/lounges
router.patch('/:id', adminAuth, updateLoungeValidation, validate, updateLounge); // PATCH /api/lounges/:id

module.exports = router;
