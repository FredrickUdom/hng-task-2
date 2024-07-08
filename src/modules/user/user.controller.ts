import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '../../common/decorators/response.decorator';
import { USER_CREATED } from '../../common/constant/user.constant';
import { STATUS_CODES } from 'http';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage(USER_CREATED)
  @Post('register')
  async create(@Body() payload: signUpDto) {
    const submit = await this.userService.signUp(payload)
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
