const jwt = require('jsonwebtoken');

/**
 * Admin auth middleware.
 * Reads "Authorization: Bearer <token>", verifies JWT, attaches req.admin = true.
 * Returns 401 on missing/invalid/expired token.
 */
const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Admin authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Admin session expired — please log in again' });
    }
    return res.status(401).json({ message: 'Invalid admin token' });
  }
};

module.exports = adminAuth;
