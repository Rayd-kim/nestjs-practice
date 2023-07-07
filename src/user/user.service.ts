import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entitiy';
import { userDto } from './dto/user.dto';
import { userAuthDto } from './dto/userAuth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async findAll() : Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(user_id : string) : Promise<User> {
    const found = await this.userRepository.findOneBy({user_id});
    if (!found) {
      throw new NotFoundException(`${user_id} is not a member our site.`);
    }
    return found;
  }

  async create(userDto: userDto) : Promise<void> {
    // const found = await this.userRepository.findOne({where : {user_id: userDto.user_id}});
    // if (!found) {
    //   const {user_id, user_pw, user_nickname, memo} = userDto;
    //   const user = this.userRepository.create({user_id: user_id, user_pw: user_pw, user_nickname, memo});
    //   await this.userRepository.save(user);
    // } else {
    //   console.log('already our member');
    // }
    const {user_id, user_pw, user_nickname, memo} = userDto;
    const user = this.userRepository.create({user_id: user_id, user_pw: user_pw, user_nickname, memo});
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(user_id : string) : Promise<void> {
    const result = await this.userRepository.delete(user_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find user ${user_id}`);
    }
  }

  async updateUserPw(user_id: string, new_pw : string, body) : Promise<User> {
    let user = await this.findOne(user_id);

    user.user_pw = new_pw;
    await this.userRepository.save(user);
    return user;
  }

  async signIn(userAuthDto : userAuthDto) : Promise<string> {
    const user: Promise<User> = this.findOne(userAuthDto.user_id);
    if ((await user.then((found => found.user_pw === userAuthDto.user_pw)))) {
      return 'login success';
    }
    throw new UnauthorizedException('login failed');
  }


}