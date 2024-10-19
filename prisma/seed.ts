import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma  = new PrismaClient();

const salt = Number(process.env.SALT_ROUNDS)
const password = bcrypt.hashSync('123', salt)

const fakerUser = (): any => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: password,
  roleId: faker.number.int({min: 1, max: 2}),
});

async function main() {
  const fakerRounds = 10;

  console.log('Seeding...');

  /// --------- Roles ---------------
  await prisma.role.createMany({
    data: [
      { name: 'user' },
      { name: 'seller' },
    ]
  })

  /// --------- Users ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({ data: fakerUser() });
  }
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });