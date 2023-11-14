import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const dummyUser = prisma.user.create({
    data: {
      name: 'test',
      email: 'test@test.com',
      role: 'ADMIN'
    }
  })

  await prisma.$transaction([dummyUser]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });