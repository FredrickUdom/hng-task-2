import { HttpException, Injectable } from '@nestjs/common';
import { loginDto, signUpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Organization } from '../organization/entities/organization.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Organization) private organizationRepository: Repository<Organization>, private jwtService: JwtService) { }

  async signUp(payload: signUpDto) {
    payload.email = payload.email.toLowerCase()
    const { firstName, lastName, password, phone, email } = payload;
    const finduser = await this.userRepository.findOne({ where: { email: email } });
    if (finduser) {
      throw new HttpException('User already exists', 400);
    }
    const hashPassword = await argon2.hash(password);
    const user = await this.userRepository.save({ firstName, lastName, phone, email, password: hashPassword });
    delete (await user).password;

    const organisation = await this.organizationRepository.create({
      name: `${firstName}'s Organisation`,
      description: `This is a newly created Organisation`,

    });
    
    // organisation.user = [user];
    const orga = new Organization()
    orga.id = user.id
    await this.organizationRepository.save(organisation);

    user.organization = [organisation];
    await this.userRepository.save(user);
delete user.organization
    const accessToken = await this.generateToken((await user).id);
    const data = {
      accessToken,
      user,
    }

    return data
  }

  async login(payload:loginDto){

    const { password, email}= payload;
    const user = await this.userRepository.findOne({where:{email}});
    if(!user){
      throw new HttpException('wrong credentials on email', 400);
    }
    const passwordMatch = await this.verifyPassword(user.password, password);

    if(!passwordMatch){
      throw new HttpException('wrong credentials on password', 400);
    }
    
    const accessToken = await this.generateToken((await user).id);
    const data = {
      accessToken,
      user,
    }
    delete user.password;
    return data
  }


  async generateToken(userId) {
    return await this.jwtService.sign({ userId });


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
