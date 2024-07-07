import { HttpException, Injectable } from '@nestjs/common';
import {  signUpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  async signUp(payload: signUpDto) {
    payload.email = payload.email.toLowerCase()
    const {firstName, lastName, password, phone, email}= payload;
    const user = await this.userRepository.findOne({where:{email:email}});
    if(user){
      throw new HttpException('User already exists', 400);
    }
    const hashPassword = await argon2.hash(password);
    const newUser =  this.userRepository.save({firstName, lastName, phone, email, password: hashPassword});
    delete (await newUser).password
    return newUser
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verifyPassword(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch (err) {
      return false;
    }
  }
}
