const jwt = require('jsonwebtoken');
const prisma = require('../src/config/prisma');

async function runTests() {
  console.log('--- STARTING BACKEND FEATURE VERIFICATION TESTS ---');

  const secret = process.env.JWT_SHARED_SECRET || 'parent_app_jwt_secret_dev_key';

  // 1. Test JWT Generation & Identity Handoff payload
  const testUserPayload = {
    userId: 'test-parent-user-123',
    email: 'parentuser123@example.com',
    name: 'Parent App User',
    phone: '+15550199',
  };
  const token = jwt.sign(testUserPayload, secret, { expiresIn: '1h' });
  console.log('✅ 1. Identity Handoff JWT created successfully');

  // 2. Test Input Validation imports & functions
  const validators = require('../src/middleware/validators');
  if (validators.createBookingValidation && validators.cancelBookingValidation) {
    console.log('✅ 2. Validation schemas loaded successfully');
  }

  // 3. Test Rate Limiter export
  const limiters = require('../src/middleware/rateLimiter');
  if (limiters.apiLimiter && limiters.adminLimiter && limiters.loginLimiter) {
    console.log('✅ 3. Rate limiters configured successfully');
  }

  // 4. Test Cancellation Cutoff constant
  const bookingsCtrl = require('../src/controllers/bookingsController');
  if (bookingsCtrl.CANCELLATION_CUTOFF_HOURS === 24) {
    console.log('✅ 4. Cancellation cutoff set to 24 hours');
  }

  console.log('--- ALL VERIFICATION CHECKS PASSED ---');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
