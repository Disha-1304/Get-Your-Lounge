const express = require('express');
const router = express.Router();
const { googleLogin, demoLogin } = require('../controllers/authController');

// POST /api/auth/google
router.post('/google', googleLogin);

// POST /api/auth/login, /demo, /register
router.post('/login', demoLogin);
router.post('/register', demoLogin);
router.post('/demo', demoLogin);

module.exports = router;
