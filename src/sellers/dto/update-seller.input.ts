import { IsEmail } from 'class-validator';
import { CreateSellerInput } from './create-seller.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSellerInput extends PartialType(CreateSellerInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  password: string;
}
