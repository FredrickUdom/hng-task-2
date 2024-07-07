import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/common/config/environment';
import { Organization } from '../organization/entities/organization.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Organization]),
    JwtModule.register({
      global: true,
       secret:environment.JWT_SECRET.SECRET,
       signOptions: { expiresIn: environment.JWT_EXPIRES_IN.EXPIRES_IN },
      })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
