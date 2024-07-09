import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { loginDto, signUpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '../../common/decorators/response.decorator';
import { DATA_FETCH, LOGGED_IN, USER_CREATED } from '../../common/constant/user.constant';
import { STATUS_CODES } from 'http';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage(USER_CREATED)
  @Post('auth/register')
  async register(@Body() payload: signUpDto) {
    const submit = await this.userService.signUp(payload)
    if(!submit){
      throw new BadRequestException('Registration unsuccessful ')
    }
    return submit
  }
  @ResponseMessage(LOGGED_IN)
  @Post('auth/login')
  async login(@Body() payload: loginDto) {
    const submit = await this.userService.login(payload)
    if(!submit){
      throw new BadRequestException('Registration unsuccessful ')
    }
    return submit
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ResponseMessage(DATA_FETCH)
  @UseGuards(AuthGuard)
  @Get('/api/users/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


}
