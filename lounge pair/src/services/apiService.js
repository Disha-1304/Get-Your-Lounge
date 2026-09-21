/**
 * apiService.js
 * ────────────────────────────────────────────────────────────
 * Centralized API client connecting the React frontend to the
 * Node.js + Express + PostgreSQL backend.
 */

import { createParentAppJwt } from '../utils/jwtHelper';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://lounge-backend-npok.onrender.com/api');

/**
 * Fetch all active lounges from backend (with optional ?search= parameter)
 */
export async function fetchLounges(searchQuery = '') {
  try {
    const url = searchQuery
      ? `${API_BASE}/lounges?search=${encodeURIComponent(searchQuery)}`
      : `${API_BASE}/lounges`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[apiService] fetchLounges failed, returning null for fallback:', err.message);
    return null;
  }
}

/**
 * Fetch lounge details by ID
 */
export async function fetchLoungeById(id) {
  try {
    const res = await fetch(`${API_BASE}/lounges/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[apiService] fetchLoungeById failed:', err.message);
    return null;
  }
}

/**
 * Create a new booking with JWT identity handoff token
 */
export async function createBooking(bookingPayload, userDetails) {
  const token = await createParentAppJwt(userDetails);

  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookingPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to create booking');
    error.status = response.status;
    error.errors = data.errors || [];
    throw error;
  }

  return data;
}

/**
 * Fetch all bookings for a user by email/userId using JWT authentication
 */
export async function fetchUserBookings(user) {
  const token = await createParentAppJwt(user);
  const userId = user.id || user.userId || `user_${(user.email || '').replace(/[^a-zA-Z0-9]/g, '_')}`;

  const response = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}/bookings`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch bookings');
  }

  return await response.json();
}

/**
 * Cancel a user booking by ID with 24h cutoff verification
 */
export async function cancelUserBooking(bookingId, user) {
  const token = await createParentAppJwt(user);

  const response = await fetch(`${API_BASE}/bookings/${encodeURIComponent(bookingId)}/cancel`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to cancel booking');
    error.status = response.status;
    throw error;
  }

  return data;
}
