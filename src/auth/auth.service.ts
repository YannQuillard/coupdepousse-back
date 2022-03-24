import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
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
        const existingPhone = await this.findPhone(createVerificationCodeDto.phone);
        Logger.log(existingPhone);
        if(existingPhone === null) {
            const code = Math.floor(1000 + Math.random() * 9000);
            createVerificationCodeDto.code = code;
            return this.verificationCode.create(createVerificationCodeDto);
        }
        else {

        }
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
        return result;
    }

    async findPhone(phone: string) {
        const result = await this.verificationCode.findOne({
            where: {
                phone
            }
        });

        return result;
    }

    async deleteCode(phone: string) {
        const code = await this.findPhone(phone);
        await code.destroy()
    }
}