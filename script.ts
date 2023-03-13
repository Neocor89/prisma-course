import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //: Write Prisma Client Queries
  await prisma.user.deleteMany();
  
}

main()

//: Disconnect database after queries running
.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  await prisma.$disconnect()
})