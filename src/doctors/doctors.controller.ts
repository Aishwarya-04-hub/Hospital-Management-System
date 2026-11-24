import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/parse-object-id.pipe';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}
  @Post() create(@Body() dto: CreateDoctorDto) { return this.service.create(dto); }
  @Get() findAll(@Query('specialization') s?: string) { return this.service.findAll(s); }
  @Get(':id') findOne(@Param('id', ParseObjectIdPipe) id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateDoctorDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseObjectIdPipe) id: string) { return this.service.remove(id); }
}