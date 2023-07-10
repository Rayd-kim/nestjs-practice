import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entitiy';
import { userDto } from './dto/user.dto';
import { userAuthDto } from './dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
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

  async getAccessToken(code: string) : Promise<void> {
    const client_uid = 'u-s4t2ud-3d94fb385e79fd3ae1927dc2023fb428b19b190eeb581049231ea9dd301e17fa';
    const clinet_secret = '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';
    const tokenUrl = `https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_id=${client_uid}&client_secret=${clinet_secret}&code=${code}&redirect_uri=http://localhost:3000/user/42api/oauth_ok`;
    console.log("code :" , code);
    // let res;
    console.log(tokenUrl);
    // await fetch(tokenUrl, {method: 'post'})
    // .then(res => res.json())
    // .then(res => console.log(res)
    //   // console.log(res.accessToken);
    //   // return Promise<res>;
    //   )
    // .catch(err => {
    //   console.log(err);
    //   throw new ConflictException("Can't get Access Tocken")
    // });

  }

  async create(userDto: userDto) : Promise<void> {
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

  async signIn(userAuthDto : userAuthDto) : Promise<{accessToken: string}> {
    const user: Promise<User> = this.findOne(userAuthDto.user_id);
    if ((await user.then((found => found.user_pw === userAuthDto.user_pw)))) {
      // user token create. (secret + Payload)
      const payload = { user_id : userAuthDto.user_id };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
      // return 'login success';
    }
    throw new UnauthorizedException('login failed');
  }


}
