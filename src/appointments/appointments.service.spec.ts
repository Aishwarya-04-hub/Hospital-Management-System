import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Doctor } from '../doctors/doctor.schema';
import { KafkaService } from '../kafka/kafka.service';
import { Patient } from '../patients/patient.schema';
import { Appointment } from './appointment.schema';
import { AppointmentsService } from './appointments.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const appointmentModel = { create: jest.fn(), exists: jest.fn() };
  const patientModel = { findById: jest.fn() };
  const doctorModel = { findById: jest.fn() };
  const kafka = { publish: jest.fn() };
  const dto = { patient: 'p1', doctor: 'd1', date: '2026-12-01T10:00:00.000Z', reason: 'checkup' };

  beforeEach(async () => {
    jest.resetAllMocks();
    const mod = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: getModelToken(Appointment.name), useValue: appointmentModel },
        { provide: getModelToken(Patient.name), useValue: patientModel },
        { provide: getModelToken(Doctor.name), useValue: doctorModel },
        { provide: KafkaService, useValue: kafka },
      ],
    }).compile();
    service = mod.get(AppointmentsService);
  });

  it('throws NotFound when patient is missing', async () => {
    patientModel.findById.mockResolvedValue(null);
    await expect(service.create(dto)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws Conflict when the doctor slot is taken', async () => {
    patientModel.findById.mockResolvedValue({ name: 'A', email: 'a@x.com' });
    doctorModel.findById.mockResolvedValue({ name: 'Dr B' });
    appointmentModel.exists.mockResolvedValue({ _id: 'x' });
    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
  });

  it('creates the appointment and publishes appointment-created', async () => {
    patientModel.findById.mockResolvedValue({ name: 'A', email: 'a@x.com' });
    doctorModel.findById.mockResolvedValue({ name: 'Dr B' });
    appointmentModel.exists.mockResolvedValue(null);
    appointmentModel.create.mockResolvedValue({ _id: 'abc123' });
    await service.create(dto);
    expect(kafka.publish).toHaveBeenCalledWith(
      'appointment-created',
      expect.objectContaining({ patientEmail: 'a@x.com', doctorName: 'Dr B' }),
      'abc123',
    );
  });
});