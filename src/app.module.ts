import { HelloModule } from './hello/hello.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';
import { ApiKeyGuard } from './common/api-key.guard';
import { DoctorsModule } from './doctors/doctors.module';
import { KafkaModule } from './kafka/kafka.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PatientsModule } from './patients/patients.module';

@Module({ imports: [ ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRootAsync({ inject: [ConfigService], useFactory: (c: ConfigService) => ({ uri: c.get('MONGO_URI') }), }), KafkaModule, PatientsModule, DoctorsModule, AppointmentsModule, NotificationsModule, ], providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }], })
export class AppModule {}