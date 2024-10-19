import { Injectable } from '@nestjs/common';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums';

@Injectable()
export class SellersService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createSellerInput: CreateSellerInput) {
    const salt = Number(this.configService.get('SALT_ROUNDS'))
    const password = await bcrypt.hash(createSellerInput.password, salt)

    const sellerRole = await this.prismaService.role.findFirst({
      where: {
        name: UserRole.Seller,
      }
    })

    console.log(sellerRole)
    console.log(UserRole.Seller)

    return await this.prismaService.user.create({
      data: {
        ...createSellerInput,
        password: password,
        roleId: sellerRole.id
      }
    })
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      where: {
        role: {
          name: UserRole.Seller,
        }
      }
    })
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: id,
      }
    });
  }

  async update(id: number, updateSellerInput: UpdateSellerInput) {
    if (updateSellerInput.password) {
      const salt = Number(this.configService.get('SALT_ROUNDS'))
      updateSellerInput.password = await bcrypt.hash(updateSellerInput.password, salt)
    }

    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateSellerInput
      }
    })
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      }
    });
  }
}
