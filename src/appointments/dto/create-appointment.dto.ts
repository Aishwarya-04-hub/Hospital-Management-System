
import {
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  patient!: string;

  @IsMongoId()
  doctor!: string;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
