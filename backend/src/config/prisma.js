const { PrismaClient } = require('@prisma/client');

// Singleton pattern — reuse the same client across all modules
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://lounge_db_3zsd_user:hkyasXotmym1cIaDoAEwCQQ9yfoq1OHC@dpg-dan393ajnfac73f73c20-a.singapore-postgres.render.com/lounge_db_3zsd",
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

module.exports = prisma;
