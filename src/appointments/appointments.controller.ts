import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/parse-object-id.pipe';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}
  @Post() create(@Body() dto: CreateAppointmentDto) { return this.service.create(dto); }
  @Get() findAll(@Query('status') status?: string, @Query('doctor') doctor?: string, @Query('patient') patient?: string) {
    return this.service.findAll({ status, doctor, patient });
  }
  @Get(':id') findOne(@Param('id', ParseObjectIdPipe) id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateAppointmentDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseObjectIdPipe) id: string) { return this.service.remove(id); }
}