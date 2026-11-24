import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({ imports: [ MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]), PatientsModule, DoctorsModule, ], controllers: [AppointmentsController], providers: [AppointmentsService], })
export class AppointmentsModule {}