"use strict";
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const appointments_module_1 = require("./appointments/appointments.module");
const api_key_guard_1 = require("./common/api-key.guard");
const doctors_module_1 = require("./doctors/doctors.module");
const kafka_module_1 = require("./kafka/kafka.module");
const notifications_module_1 = require("./notifications/notifications.module");
const patients_module_1 = require("./patients/patients.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({ imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), mongoose_1.MongooseModule.forRootAsync({ inject: [config_1.ConfigService], useFactory: (c) => ({ uri: c.get('MONGO_URI') }), }), kafka_module_1.KafkaModule, patients_module_1.PatientsModule, doctors_module_1.DoctorsModule, appointments_module_1.AppointmentsModule, notifications_module_1.NotificationsModule,], providers: [{ provide: core_1.APP_GUARD, useClass: api_key_guard_1.ApiKeyGuard }], })
], AppModule);
