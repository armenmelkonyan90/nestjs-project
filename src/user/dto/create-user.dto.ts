import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "@nestjs/class-validator";
import { IsPhoneNumber, Validate } from "class-validator";
import { Unique } from "../../validation/unique.decorator";
import { User } from "../entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @Unique(User, 'username')
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
    @Unique(User, 'email')
    email:string

    @IsNotEmpty()
    // @IsPhoneNumber('AM')
    @IsPhoneNumber()
    @Unique(User, 'phone')
    phone:string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password:string
}
