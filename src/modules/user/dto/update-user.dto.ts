import { PartialType } from '@nestjs/mapped-types';
import { signUpDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(signUpDto) {}
