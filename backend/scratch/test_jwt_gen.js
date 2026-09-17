const jwt = require('jsonwebtoken');

const secret = 'parent_app_jwt_secret_dev_key';

// Simulate WebCrypto JWT generation logic
async function testJwt() {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId: 'usr_test_123',
    email: 'test@getyourlounge.com',
    name: 'Test Passenger',
    phone: '+15550199',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const base64UrlEncode = (obj) => {
    const str = JSON.stringify(obj);
    const base64 = Buffer.from(str).toString('base64');
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const token = `${dataToSign}.${signature}`;
  console.log('Generated token:', token);

  const decoded = jwt.verify(token, secret);
  console.log('Verified decoded:', decoded);
}

testJwt().then(() => console.log('JWT test passed!'));
