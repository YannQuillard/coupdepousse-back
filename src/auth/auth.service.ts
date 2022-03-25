import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateVerificationCodeDto } from './dto/create-verificationCode.dto';
import { Token } from './token.model';
import { VerificationCode } from './verificationCode.model';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNbr = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

@Injectable()
export class AuthService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private readonly tokenRepository: typeof Token,

        @Inject('VERIFICATIONCODE_REPOSITORY')
        private readonly verificationCode: typeof VerificationCode,

        private readonly userService: UsersService
    ) {}

    async createToken(createTokenDto: CreateTokenDto ): Promise<Token> {
        return this.tokenRepository.create(createTokenDto);
    }

    async createCode(createVerificationCodeDto: CreateVerificationCodeDto ): Promise<VerificationCode> {
        const existingPhone = await this.findPhone(createVerificationCodeDto.phone);
        const code = Math.floor(1000 + Math.random() * 9000);

        if(existingPhone === null) {
            createVerificationCodeDto.code = code;
            client.messages.create({
                body:`Voici votre code d'authentification : ${code}`,
                from: phoneNbr,
                to: createVerificationCodeDto.phone
            })
            return this.verificationCode.create(createVerificationCodeDto);
        }
        else {
            this.deleteCode(createVerificationCodeDto.phone);
            createVerificationCodeDto.code = code;
            client.messages.create({
                body:`Voici votre code d'authentification : ${code}`,
                from: phoneNbr,
                to: createVerificationCodeDto.phone
            })
            return this.verificationCode.create(createVerificationCodeDto);
        }
    }

    async checkCode(createVerificationCodeDto: CreateVerificationCodeDto) {
        const phone = createVerificationCodeDto.phone;
        const code = createVerificationCodeDto.code;
        
        const result = await this.verificationCode.findOne({
            where: {
                phone,
                code
            },
        });
        
        if(!result) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } 
        else {
            const timestamp = new Date(result.timestamp).getTime() + 600;
            const validateUpdate = await this.userService.updateValidate(phone);

            if(timestamp > Date.now()) {
                this.deleteCode(phone);
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }
    
            if(!validateUpdate) {
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }

            this.deleteCode(phone);
            return {
                "message": "Valid code"
            };
        }
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