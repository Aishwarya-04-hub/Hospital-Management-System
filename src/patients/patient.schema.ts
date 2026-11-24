import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) age: number;
  @Prop({ enum: ['male', 'female', 'other'] }) gender?: string;
  @Prop() phone?: string;
}
export const PatientSchema = SchemaFactory.createForClass(Patient);