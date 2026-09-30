const prisma = require('./src/config/prisma');

async function test() {
  try {
    const email = 'test@example.com';
    const name = undefined; // to see if it throws

    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name },
    });
    console.log(user);
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
