import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/parse-object-id.pipe';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}
  @Post() create(@Body() dto: CreatePatientDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseObjectIdPipe) id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdatePatientDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseObjectIdPipe) id: string) { return this.service.remove(id); }
}