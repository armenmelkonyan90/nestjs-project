import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "@nestjs/class-validator";
import { IsPhoneNumber, Validate } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
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

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password:string
}
