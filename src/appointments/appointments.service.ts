
import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Doctor, DoctorDocument } from '../doctors/doctor.schema';
import { KafkaService } from '../kafka/kafka.service';
import { Patient, PatientDocument } from '../patients/patient.schema';

import {
  Appointment,
  AppointmentDocument
} from './appointment.schema';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

export const APPOINTMENT_CREATED_TOPIC = 'appointment-created';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectModel(Appointment.name)
    private readonly model: Model<AppointmentDocument>,

    @InjectModel(Patient.name)
    private readonly patients: Model<PatientDocument>,

    @InjectModel(Doctor.name)
    private readonly doctors: Model<DoctorDocument>,

    private readonly kafka: KafkaService
  ) {}

  async create(dto: CreateAppointmentDto) {

    const patient = await this.patients.findById(dto.patient);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const doctor = await this.doctors.findById(dto.doctor);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const date = new Date(dto.date);

    await this.assertSlotFree(dto.doctor, date);

    const appt = await this.model.create({
      ...dto,
      date
    });

    await this.kafka.publish(
      APPOINTMENT_CREATED_TOPIC,
      {
        appointmentId: appt._id.toString(),
        patientName: patient.name,
        patientEmail: patient.email,
        doctorName: doctor.name,
        date: date.toISOString()
      },
      appt._id.toString()
    );

    return appt;
  }

  findAll(
    filter: {
      status?: string;
      doctor?: string;
      patient?: string;
    } = {}
  ) {

    const q: Record<string, string> = {};

    const keys = ['status', 'doctor', 'patient'] as const;

    for (const k of keys) {
      const value = filter[k];

      if (value) {
        q[k] = value;
      }
    }

    return this.model
      .find(q)
      .populate('patient doctor')
      .sort({ date: 1 })
      .exec();
  }

  async findOne(id: string) {

    const appointment = await this.model
      .findById(id)
      .populate('patient doctor')
      .exec();

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async update(id: string, dto: UpdateAppointmentDto) {

    const existing = await this.model.findById(id);

    if (!existing) {
      throw new NotFoundException('Appointment not found');
    }

    if (dto.date) {
      await this.assertSlotFree(
        existing.doctor.toString(),
        new Date(dto.date),
        id
      );
    }

    Object.assign(
      existing,
      dto,
      dto.date ? { date: new Date(dto.date) } : {}
    );

    return existing.save();
  }

  async remove(id: string) {

    const appointment = await this.model
      .findByIdAndDelete(id)
      .exec();

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return { deleted: true };
  }

  private async assertSlotFree(
    doctorId: string,
    date: Date,
    ignoreId?: string
  ) {

    const clash = await this.model.exists({
      doctor: doctorId,
      date,
      status: { $ne: 'cancelled' },
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {})
    });

    if (clash) {
      throw new ConflictException(
        'Doctor already has an appointment at that time'
      );
    }
  }
}
