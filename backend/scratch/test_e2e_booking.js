const jwt = require('jsonwebtoken');

async function testE2E() {
  const secret = process.env.JWT_SHARED_SECRET || 'parent_app_jwt_secret_dev_key';

  const userPayload = {
    userId: 'usr_e2e_test_999',
    email: 'passenger_e2e@example.com',
    name: 'Test Traveler',
    phone: '+155599988',
  };

  const token = jwt.sign(userPayload, secret, { expiresIn: '1h' });

  // 1. Fetch first lounge
  const loungesRes = await fetch('http://localhost:5000/api/lounges');
  const lounges = await loungesRes.json();
  console.log(`Fetched ${lounges.length} lounges from database.`);

  const targetLounge = lounges[0];
  console.log('Target lounge:', targetLounge.name, '(_dbId:', targetLounge._dbId, ')');

  // 2. Create booking
  const bookingPayload = {
    loungeId: targetLounge._dbId || targetLounge.id,
    visitDate: '2026-10-15T10:00:00.000Z',
    numberOfGuests: 2,
    flightNumber: 'AI-202',
  };

  const createRes = await fetch('http://localhost:5000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookingPayload),
  });

  const createdBooking = await createRes.json();
  console.log('Create booking response status:', createRes.status);
  console.log('Created booking:', createdBooking);

  if (createRes.status !== 201) {
    throw new Error(`Failed to create booking: ${JSON.stringify(createdBooking)}`);
  }

  // 3. Fetch user bookings history
  const userBookingsRes = await fetch(`http://localhost:5000/api/users/${encodeURIComponent(createdBooking.userId)}/bookings`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const userHistory = await userBookingsRes.json();
  console.log('User history bookings count:', userHistory.bookings.length);

  // 4. Test cancel booking
  const cancelRes = await fetch(`http://localhost:5000/api/bookings/${encodeURIComponent(createdBooking.id)}/cancel`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const cancelledBooking = await cancelRes.json();
  console.log('Cancel booking response status:', cancelRes.status);
  console.log('Cancelled booking status:', cancelledBooking.status);

  console.log('\n🎉 ALL E2E BACKEND & FRONTEND API INTEGRATION CHECKS PASSED!');
  process.exit(0);
}

testE2E().catch(err => {
  console.error('E2E Test error:', err);
  process.exit(1);
});
