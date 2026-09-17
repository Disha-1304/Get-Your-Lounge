const { PrismaClient } = require('@prisma/client');

// Singleton pattern — reuse the same client across all modules
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

module.exports = prisma;
