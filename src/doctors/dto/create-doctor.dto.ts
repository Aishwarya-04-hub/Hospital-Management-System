import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {
    @IsString() @MinLength(2) name: string;
    @IsString() @MinLength(2) specialization: string;
    @IsEmail() email: string;
}

