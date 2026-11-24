
import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './patient.schema';

@Injectable()
export class PatientsService {

  constructor(
    @InjectModel(Patient.name)
    private readonly model: Model<PatientDocument>
  ) {}

  async create(dto: CreatePatientDto) {

    try {
      return await this.model.create(dto);

    } catch (e) {

      const error = e as { code?: number };

      if (error.code === 11000) {
        throw new ConflictException(
          'Patient email already exists'
        );
      }

      throw e;
    }
  }

  findAll() {
    return this.model
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {

    const patient = await this.model
      .findById(id)
      .exec();

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(id: string, dto: UpdatePatientDto) {

    const patient = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async remove(id: string) {

    const patient = await this.model
      .findByIdAndDelete(id)
      .exec();

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return { deleted: true };
  }
}
