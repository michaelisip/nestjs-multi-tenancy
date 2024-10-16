import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const salt = Number(this.configService.get('SALT_ROUNDS'))
    const password = await bcrypt.hash(createUserInput.password, salt)

    return await this.prismaService.user.create({
      data: {
        ...createUserInput,
        password: password
      }
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      orderBy: {
        id: 'desc',
      }
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
      }
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
      }
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
