import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { environment } from 'src/config/environment';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: environment.jwt.secret,
			signOptions: {
				expiresIn: '60s'
			}
		}),
	],
  providers: [AuthService, AuthResolver, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
