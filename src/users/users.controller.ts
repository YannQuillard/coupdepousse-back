import { Body, Controller, Delete, Get, Param, Post, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

/**
 * S'inscrire
 * Update le profil
 * Vérifier si un user existe
 * Se connecter
 * Récuperer le profil d'un user
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('/phone/:phone')
  findOneByPhone(@Param('phone') phone: string): Promise<User> {
    return this.usersService.findOneByPhone(phone); 
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}