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

  const dummyTag = prisma.tag.createMany({
    data:[
      // Language
      {name: 'Javascript'},
      {name: 'Java'},
      {name: 'Typescript'},
      {name: 'Go'},
      {name: 'Node'},
      {name: 'PHP'},
      {name: 'HTML'},
      {name: 'CSS'},
      {name: 'Python'},
      {name: 'Rust'},
      // Framework
      {name: 'React'},
      {name: 'Vue'},
      {name: 'Angular'},
      {name: 'Next'},
      {name: 'Remix'},
      {name: 'Spring'},
      {name: 'Laravel'},
      // Infrastructure
      {name: 'AWS'},
      {name: 'GCP'},
      {name: 'Azure'},
      // ORM
      {name: 'Prisma'},
      {name: 'Drizzle'},
      // DB
      {name: 'Mysql'},
      {name: 'Postgresql'},
      {name: 'NoSQL'},
      // Baas
      {name: 'Planet Scale'},
      {name: 'Supabase'},
      {name: 'Firebase'},
    ]
  })

  await prisma.$transaction([dummyUser, dummyTag]);
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