import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //: Write Prisma Client Queries
}

main()

.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  //: Disconnect from the database after queries running
  await prisma.$disconnect()
})