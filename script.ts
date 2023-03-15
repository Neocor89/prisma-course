import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //: Write Prisma Client Queries
  // TODO RESTART HERE 👇
  
  const user = await prisma.user.create({
    data: {
      name: "Ben",
      email: "bendevweb@test.com",
      age: 37
    }
    
    })
  
}

main()

//: Disconnect database after queries running
.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  await prisma.$disconnect()
})