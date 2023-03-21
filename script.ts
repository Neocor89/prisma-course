import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //: Write Prisma Client Queries

  // await prisma.user.deleteMany();

  const user = await prisma.user.update({
    where: {
      email: "",
    },
    data: {
      email: ""
    }
  })
    console.log(user)
}

main()

//: Disconnect database after queries running
.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  await prisma.$disconnect()
})