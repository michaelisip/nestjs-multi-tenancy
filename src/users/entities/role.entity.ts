import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Role {
  @Field(() => String)
  name: string;

  @Field(() => [User], { nullable: true })
  users?: Array<User>;
}
