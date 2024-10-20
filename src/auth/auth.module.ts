import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { environment } from 'src/config/environment';
import { JwtStrategy } from './strategies';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: environment.jwt.secret,
			signOptions: {
				expiresIn: '10m'
			}
		}),
	],
  providers: [AuthService, AuthResolver, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
