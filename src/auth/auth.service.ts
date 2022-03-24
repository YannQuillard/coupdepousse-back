import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateVerificationCodeDto } from './dto/create-verificationCode.dto';
import { Token } from './token.model';
import { VerificationCode } from './verificationCode.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private readonly tokenRepository: typeof Token,

        @Inject('VERIFICATIONCODE_REPOSITORY')
        private readonly verificationCode: typeof VerificationCode,
    ) {}

    async createToken(createTokenDto: CreateTokenDto ): Promise<Token> {
        return this.tokenRepository.create(createTokenDto);
    }

    async createCode(createVerificationCodeDto: CreateVerificationCodeDto ): Promise<VerificationCode> {
        const code = Math.floor(1000 + Math.random() * 9000);
        createVerificationCodeDto.code = code;
        return this.verificationCode.create(createVerificationCodeDto);
    }

    async checkCode(code: number, phone: string) {
        const result = await this.verificationCode.findOne({
            where: {
                phone,
                code
            },
        });

        if(!result) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        return result
    }
}