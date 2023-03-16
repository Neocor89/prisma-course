import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //: Write Prisma Client Queries

  await prisma.user.deleteMany();
  
  const users = await prisma.user.createMany({
    data: [{
      name: "Ben",
      email: "bendevweb@test.com",
      age: 37,
    },
    {
      name: "Matèo",
      email: "mateo@test.com",
      age: 7,
    },
    {
      name: "Céline",
      email: "celine@test.com",
      age: 47,
    }]
    })
    
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