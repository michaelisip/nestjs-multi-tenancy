import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto';
import { LoginResponse } from './responses';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput.email, loginInput.password);

    if (user) {
      return this.authService.login(user);
    }

    throw new UnauthorizedException();
  }
}
