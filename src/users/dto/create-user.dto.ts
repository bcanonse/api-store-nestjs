import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { UserRoleDto } from './role-user.dto';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'The email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsEnum(UserRoleDto)
  @IsNotEmpty()
  readonly role: UserRoleDto;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  public readonly customerId: number;
}
