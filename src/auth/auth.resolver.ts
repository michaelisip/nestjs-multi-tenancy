import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './responses/login.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput.email, loginInput.password);

    if (user) {
      return this.authService.login(user);
    }

    throw new UnauthorizedException();
  }
}
