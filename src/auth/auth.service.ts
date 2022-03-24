import { Injectable, Inject } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateVerificationCodeDto } from './dto/create-verificationCode.dto';
import { Token } from './token.model';
import { VerificationCode } from './verificationCode.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AuthRepository')
        private readonly tokenRepository: typeof Token,
        private readonly verificationCode: typeof VerificationCode,
    ) {}

    async createToken(createTaskDto: CreateTokenDto ): Promise<Token> {
        return this.tokenRepository.create(createTaskDto);
    }

    async createCode(createVerificationCodeDto: CreateVerificationCodeDto ): Promise<VerificationCode> {
        return this.verificationCode.create(createVerificationCodeDto);
    }
}