import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    name:string
}
