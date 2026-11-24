import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;
export const APPOINTMENT_STATUSES = ['scheduled', 'completed', 'cancelled'];

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true }) patient: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true }) doctor: Types.ObjectId;
  @Prop({ required: true }) date: Date;
  @Prop() reason?: string;
  @Prop({ enum: APPOINTMENT_STATUSES, default: 'scheduled' }) status: string;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);