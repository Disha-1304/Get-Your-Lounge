const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const lounges = await prisma.lounge.findMany({
    select: { id: true, legacyId: true, name: true, city: true, airportCode: true, rating: true, reviewsCount: true }
  });

  console.log('Total lounges in DB:', lounges.length);
  const withRating = lounges.filter(l => l.rating !== null && l.rating > 0);
  console.log('Lounges with rating > 0:', withRating.length);
  console.log('Lounges missing rating:', lounges.length - withRating.length);

  console.log('\nSample lounges missing rating:');
  console.log(lounges.filter(l => !l.rating).slice(0, 10));

  console.log('\nSample lounges WITH rating:');
  console.log(withRating.slice(0, 5));

  await prisma.$disconnect();
}

check();
