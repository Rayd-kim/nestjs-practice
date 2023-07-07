import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entitiy';
import { userRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userRepository)
    private userRepository: userRepository,
    private userService: UserService
  ){}

  // async signUp(user : User) : Promise<void> {
  //   this.userService.create(user);
  // }


}
