import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';
import { Unique } from 'typeorm';

export class UpdateUserDto {
    @IsNotEmpty()
    @Unique('username-uniqe', ['username'])
    @MinLength(2)
    @MaxLength(20)
    username: string
    
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    first_name:string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    last_name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    // @IsPhoneNumber('AM')
    @IsPhoneNumber()
    phone:string
}
