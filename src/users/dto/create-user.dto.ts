import { Type } from 'class-transformer';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 20)
  name: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  age: number;

  @IsString()
  email: string;
}
