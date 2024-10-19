import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersResolver } from './sellers.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SellersResolver, SellersService],
  exports: [SellersService],
})
export class SellersModule {}
