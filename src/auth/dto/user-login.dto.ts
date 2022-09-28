import { IsNotEmpty} from "@nestjs/class-validator";

export class UserLoginDto {
    @IsNotEmpty()
    username: string
    
    @IsNotEmpty()
    password: string
}
