import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //: Write Prisma Client Queries

  /*
  const user = await prisma.user.create({
    data: {
      name: "Neocor89"
    }
  })
  console.log(user);
  */

  const users = await prisma.user.findMany();
  console.log(users);
  

  
}

main()

//: Disconnect database after queries running
.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  await prisma.$disconnect()
})