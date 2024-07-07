import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString } from "class-validator"

export class signUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

}
