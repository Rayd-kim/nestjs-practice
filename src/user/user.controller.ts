import { Body, Controller, Delete, Get, Param, Patch, Post, Req, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entitiy';
import { rejects } from 'assert';
import { isString } from 'class-validator';
import { userPwValidationPipe } from 'src/boards/pipes/user-pw-validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';
import { userAuthDto } from './dto/userAuth.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {};

  @Get()
  findAll() : Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id : string) : Promise<User> {
    return this.userService.findOne(user_id)
  }

  @Post('/signup')
  create(@Body(ValidationPipe) userDto: userDto) : Promise<void> {
    return this.userService.create(userDto);
  }

  @Delete('/delete:user_id')
  remove(@Param('user_id') user_id : string) : Promise<void> {
    return this.userService.remove(user_id);
  }

  @Patch('/changePw:user_id/')
  updateUserPw(
    @Param('user_id') user_id : string,
    @Body('user_pw') user_pw : string,
    @Body() body
    ) : Promise<User> {
      return this.userService.updateUserPw(user_id, user_pw, body);
  }

  @Post('/signin')
  signIn(@Body() userAuthDto : userAuthDto) : Promise<{accessToken: string}> {
    return this.userService.signIn(userAuthDto);
  } 

  @Post('/test')
  test(@Req() req) {
    console.log('req : ',req);
  }

}
