import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { TokenProviders, VerificationCodeProviders } from './auth.providers';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...TokenProviders,
    ...VerificationCodeProviders
  ],
})
export class AuthModule {}