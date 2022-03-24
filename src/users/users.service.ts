import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User,
    private httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingPhone = await this.findOneByPhone(createUserDto.phone);
    // let coordinate = this.fetchAddress(createUserDto.address, createUserDto.postalCode, createUserDto.city, createUserDto.country);

    // return coordinate;
    // Logger.log(coordinate[0]);
    // if(coordinate[0].lat && coordinate[0].lon) {
    //   createUserDto.latitude = coordinate[0].lat;
    //   createUserDto.longitude = coordinate[0].lon;
    // }


    if(existingPhone !== null) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    else {
      const newUser = this.usersRepository.create(createUserDto);

      const user = {
        id: (await newUser).id,
        phone: (await newUser).phone,
        firstName: (await newUser).firstName,
        //token: this.generateJWT(user),
      };
      return { user };
    }
  }

  fetchAddress(address: string, postalCode: string, city: string, country: string): Observable<Array<any>> {
    const addressQuery = `street=${encodeURIComponent(address)}&postalcode=${encodeURIComponent(postalCode)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;

    return this.httpService.get(`${process.env.OSM_URL}/search?${addressQuery}&format=json`).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      })
    );
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByPhone(phone: string){
    const result = await this.usersRepository.findOne({
      where: {
        phone,
      },
    });
    return result;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy()
  }
}