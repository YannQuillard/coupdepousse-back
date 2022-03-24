import { Body, Controller, Delete, Get, Param, Post, Logger } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateVerificationCodeDto } from './dto/create-verificationCode.dto';
import { Token } from './token.model';
import { VerificationCode } from './verificationCode.model';
import { AuthService } from './auth.service';

/**
 * Créer une nouvelle tâche
 * Update une tâche
 * Validé un freeworker
 * Prendre la tâche d'un senior
 * Récuperer une tâche
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly tasksService: AuthService) {}

    @Post('/token')
    createToken(@Body() createTokenDto: CreateTokenDto) {
        return this.tasksService.createToken(createTokenDto);
    }

    @Post('/code')
    createValidationCode(@Body() createVerificationCodeDto: CreateVerificationCodeDto) {
        return this.tasksService.createCode(createVerificationCodeDto);
    }

//   @Get('/token/:id')
//   findAllToken(@Param('id') id: string): Promise<Token> {
//     return this.tasksService.findAllToken(id);
//   }

//   @Get('/code/:id')
//   findAllCode(@Param('id') id: string): Promise<Token> {
//     return this.tasksService.findAllCode(id);
//   }

//   @Delete('/token/:id')
//   removeToken(@Param('id') id: string): Promise<void> {
//     return this.tasksService.removeToken(id);
//   }

//   @Delete('/token/:id')
//   removeCode(@Param('id') id: string): Promise<void> {
//     return this.tasksService.removeCode(id);
//   }
}