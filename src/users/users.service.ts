import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


type Coordinate = {
  lat: string,
  lon: string
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User,
    private httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.isValidate = false;
    const existingPhone = await this.findOneByPhone(createUserDto.phone);

    let coordinate = this.fetchAddress(createUserDto.address, createUserDto.postalCode, createUserDto.city, createUserDto.country);
    
    coordinate.subscribe((x: Coordinate[]) => {
      console.log(x)
      if(x[0] !== undefined) {
        createUserDto.latitude = x[0].lat;
        createUserDto.longitude = x[0].lon;
      }

      if(existingPhone === null) {
        this.usersRepository.create(createUserDto);
      }
    })

    if(existingPhone !== null) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    else {
      const user = {
        phone: createUserDto.phone,
        firstName: createUserDto.firstName,
        //token: this.generateJWT(user),
      };
      return { user };
    }
  }

  fetchAddress(address: string, postalCode: string, city: string, country: string): Observable<Array<Coordinate>> {
    const addressQuery = `street=${encodeURIComponent(address)}&postalcode=${encodeURIComponent(postalCode)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;
    console.log(addressQuery);
    return this.httpService.get(`${process.env.OSM_URL}/search?${addressQuery}&format=json`).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      })
    )
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

  async updateValidate(phone) {
    const result = await this.findOneByPhone(phone);
    Logger.log(result)
    if(result === null) {
      return 'error'
    }
    else {
      result.isValidate = true;
      return await result.save();
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy()
  }
}