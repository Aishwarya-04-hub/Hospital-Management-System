
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString
} from 'class-validator';

import { APPOINTMENT_STATUSES } from '../appointment.schema';

export class UpdateAppointmentDto {

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsIn(APPOINTMENT_STATUSES)
  status?: string;

}
