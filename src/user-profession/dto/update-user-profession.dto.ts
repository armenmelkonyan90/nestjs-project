import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProfessionDto } from './create-user-profession.dto';

export class UpdateUserProfessionDto extends PartialType(CreateUserProfessionDto) {}
