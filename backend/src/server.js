const express   = require('express');
const cors      = require('cors');
const path      = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Admin static UI — served at /admin ──────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));
// ─── Static Lounge Assets ───────────────────────────────────────────────────
app.use('/assets', express.static(path.join(__dirname, '..', '..', 'lounge pair', 'public', 'assets')));

// ─── Public API Routes ────────────────────────────────────────────────────────
const loungesRoutes  = require('./routes/loungesRoutes');
const usersRoutes    = require('./routes/usersRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const authRoutes     = require('./routes/authRoutes');

app.use('/api/lounges',  loungesRoutes);
app.use('/api/users',    usersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/auth',     authRoutes);

// ─── Admin API Routes ─────────────────────────────────────────────────────────
// All admin routes (except /login) are JWT-protected inside adminRoutes.js
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// ─── Utility routes (unchanged) ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Get-Your-Lounge backend is running 🎉' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel  → http://localhost:${PORT}/admin`);
});
