import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nickname?: string | null;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(150)
  age!: number;

  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status!: number;
}
