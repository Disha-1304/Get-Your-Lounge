/**
 * authenticateUser.js
 * ────────────────────────────────────────────────────────────
 * Identity Handoff Middleware for Parent App Integration
 *
 * Reads a Bearer JWT from the `Authorization` header, verifies it
 * against JWT_SHARED_SECRET (or fallback JWT_SECRET), and auto-creates/upserts
 * the user record in PostgreSQL so bookings never fail due to missing users.
 *
 * Swap mechanism: To change identity verification (e.g. to API key or OAuth),
 * update ONLY this file.
 */

const jwt    = require('jsonwebtoken');
const prisma = require('../config/prisma');

const JWT_SECRET = process.env.JWT_SHARED_SECRET || process.env.JWT_SECRET || 'parent_app_jwt_secret_dev_key';

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required. Missing or malformed Bearer token.',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Authentication required. Token is missing.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired. Please re-authenticate.' });
      }
      return res.status(401).json({ message: 'Invalid authentication token.' });
    }

    // Extract user details from JWT payload
    const jwtUserId = decoded.userId || decoded.sub || decoded.id;
    const jwtEmail  = decoded.email;
    const jwtName   = decoded.name || null;
    const jwtPhone  = decoded.phone || null;

    if (!jwtEmail && !jwtUserId) {
      return res.status(401).json({
        message: 'Invalid token payload: must contain email or userId.',
      });
    }

    // Lookup existing user by ID or email
    let user = null;
    if (jwtUserId) {
      user = await prisma.user.findUnique({ where: { id: jwtUserId } });
    }
    if (!user && jwtEmail) {
      user = await prisma.user.findUnique({ where: { email: jwtEmail } });
    }

    // If user does not exist locally in PostgreSQL, auto-upsert/create
    if (!user) {
      user = await prisma.user.create({
        data: {
          ...(jwtUserId ? { id: jwtUserId } : {}),
          email: jwtEmail || `${jwtUserId}@placeholder.user`,
          name:  jwtName,
          phone: jwtPhone,
        },
      });
    } else {
      // Sync name/phone if available in JWT payload and missing locally
      if ((jwtName && !user.name) || (jwtPhone && !user.phone)) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            ...(jwtName  && !user.name  ? { name: jwtName }   : {}),
            ...(jwtPhone && !user.phone ? { phone: jwtPhone } : {}),
          },
        });
      }
    }

    // Attach local DB user object to req.user for controllers
    req.user = user;
    next();
  } catch (err) {
    console.error('authenticateUser middleware error:', err);
    return res.status(500).json({ message: 'Internal authentication error' });
  }
};

module.exports = authenticateUser;
