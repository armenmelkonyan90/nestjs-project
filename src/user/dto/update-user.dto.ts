import { IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';
import { Unique } from 'src/validation/unique.decorator';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @Unique(User, 'username', 'username')
    username: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    first_name: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    last_name: string

    @IsNotEmpty()
    // @IsPhoneNumber('AM')
    @IsPhoneNumber()
    phone: string
}
