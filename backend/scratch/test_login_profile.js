const fetch = require('node-fetch'); // or use built-in fetch if Node 18+

async function test() {
  const loginRes = await fetch('http://localhost:5000/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: 'test-fake-token' }) // Will this work? No, Google verification will fail.
  });

  // We can't easily mock google token, let's create a test user via API or Prisma directly?
  console.log('Login Response:', await loginRes.json());
}
test();
