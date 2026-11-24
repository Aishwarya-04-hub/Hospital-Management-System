import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor.name) private readonly model: Model<DoctorDocument>) {}

  async create(dto: CreateDoctorDto) {
    try {
      return await this.model.create(dto);
    } catch (e: any) {
      if (e.code === 11000) throw new ConflictException('Doctor email already exists');
      throw e;
    }
  }
  findAll(specialization?: string) {
    return this.model.find(specialization ? { specialization } : {}).exec();
  }
  async findOne(id: string) {
    const d = await this.model.findById(id).exec();
    if (!d) throw new NotFoundException('Doctor not found');
    return d;
  }
  async update(id: string, dto: UpdateDoctorDto) {
    const d = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!d) throw new NotFoundException('Doctor not found');
    return d;
  }
  async remove(id: string) {
    const d = await this.model.findByIdAndDelete(id).exec();
    if (!d) throw new NotFoundException('Doctor not found');
    return { deleted: true };
  }
}