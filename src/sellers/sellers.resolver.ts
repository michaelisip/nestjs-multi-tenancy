import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellersService } from './sellers.service';
import { Seller } from './entities';
import { GqlAuthGuard, SellersGuard } from 'src/auth/guards';
import { CreateSellerInput, UpdateSellerInput } from './dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Seller)
export class SellersResolver {
  constructor(private readonly sellersService: SellersService) {}

  @Mutation(() => Seller)
  createSeller(@Args('createSellerInput') createSellerInput: CreateSellerInput) {
    return this.sellersService.create(createSellerInput);
  }

  @UseGuards(GqlAuthGuard, SellersGuard)
  @Query(() => [Seller], { name: 'sellers' })
  findAll() {
    return this.sellersService.findAll();
  }

  @Query(() => Seller, { name: 'seller' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellersService.findOne(id);
  }

  @Mutation(() => Seller)
  updateSeller(@Args('updateSellerInput') updateSellerInput: UpdateSellerInput) {
    return this.sellersService.update(updateSellerInput.id, updateSellerInput);
  }

  @Mutation(() => Seller)
  removeSeller(@Args('id', { type: () => Int }) id: number) {
    return this.sellersService.remove(id);
  }
}
