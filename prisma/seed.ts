import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums';
import { environment } from 'src/config/environment';

const prisma  = new PrismaClient();

const password = '123'
const salt = environment.jwt.salt_rounds
const hash = bcrypt.hashSync(password, salt)

const fakerUser = (): any => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: hash,
  roleId: faker.number.int({min: 1, max: 2}),
});

async function main() {
  console.log('Seeding...');

  /// --------- Roles ---------------
  await prisma.role.createMany({
    data: [
      { name: UserRole.User },
      { name: UserRole.Seller },
    ]
  })

  /// --------- Users ---------------
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({ data: fakerUser() });
  }
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });