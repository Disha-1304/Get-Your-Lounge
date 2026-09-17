const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

/**
 * POST /api/admin/login
 * Compares email + password against env vars, returns a signed JWT (24h).
 *
 * ENV vars required:
 *   ADMIN_EMAIL    — the admin email address
 *   ADMIN_PASSWORD — the plain-text password (never stored in DB)
 *   JWT_SECRET     — used to sign the token
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const adminEmail    = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret     = process.env.JWT_SECRET;

    if (!adminEmail || !adminPassword || !jwtSecret) {
      console.error('Admin env vars (ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET) are not set');
      return res.status(500).json({ message: 'Server misconfiguration — contact developer' });
    }

    // Case-insensitive email check
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // bcryptjs.compare works even if ADMIN_PASSWORD is plain text —
    // we hash it on first compare and use timingSafeEqual-style comparison.
    // For simplicity (env-based single-user), we do a direct bcrypt hash + compare.
    // The hash is generated at runtime (not stored), so each login hashes once.
    const passwordMatch = await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10));

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { role: 'admin', email: adminEmail },
      jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      expiresIn: 86400, // seconds (24h)
      email: adminEmail,
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
