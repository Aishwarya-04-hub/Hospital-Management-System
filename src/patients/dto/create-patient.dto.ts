import { IsEmail, IsIn, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class CreatePatientDto {
  @IsString() @MinLength(2) name: string;
  @IsEmail() email: string;
  @IsInt() @Min(0) @Max(120) age: number;
  @IsOptional() @IsIn(['male', 'female', 'other']) gender?: string;
  @IsOptional() @IsString() phone?: string;
}