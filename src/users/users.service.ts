import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const salt = Number(this.configService.get('SALT_ROUNDS'))
    const password = await bcrypt.hash(createUserInput.password, salt)

    const userRole = await this.prismaService.role.findFirst({
      where: {
        name: UserRole.User
      }
    });

    return await this.prismaService.user.create({
      data: {
        ...createUserInput,
        password: password,
        roleId: userRole.id,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      where: {
        role: {
          name: UserRole.User,
        }
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: id,
      }
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      include: {
        role: true
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      const salt = Number(this.configService.get('SALT_ROUNDS'))
      updateUserInput.password = await bcrypt.hash(updateUserInput.password, salt)
    }

    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserInput
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      }
    });
  }
}
