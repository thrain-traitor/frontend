import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth/auth.service';
import { JwtHelper } from 'src/helpers/JwtHelper';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'RahasiaKitaBerdua',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtHelper],
  controllers: [AuthController],
})
export class AuthModule {}
