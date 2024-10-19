import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Role } from './role.entity';

@ObjectType()
export class User {
  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;
}
