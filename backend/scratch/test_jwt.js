const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' }); // load from backend/.env

const JWT_SECRET = process.env.JWT_SHARED_SECRET || process.env.JWT_SECRET || 'parent_app_jwt_secret_dev_key';

// Mock user info (assume this user exists or will be created by authenticateUser)
const user = {
  id: 'test_cuid_123',
  email: 'test@example.com'
};

const token = jwt.sign(
  { id: user.id, email: user.email },
  JWT_SECRET,
  { expiresIn: '7d' }
);

console.log('Generated token:', token);

async function test() {
  const res = await fetch(`http://localhost:5000/api/users/${user.id}/bookings`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  console.log('Status:', res.status);
  console.log('Response:', await res.json());
}
test();
