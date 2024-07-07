import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '../../common/decorators/response.decorator';
import { USER_CREATED } from '../../common/constant/user.constant';
import { STATUS_CODES } from 'http';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage(USER_CREATED)
  @Post('register')
  create(@Body() payload: signUpDto) {
    return this.userService.signUp(payload)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
