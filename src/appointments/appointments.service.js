"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = exports.APPOINTMENT_CREATED_TOPIC = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctor_schema_1 = require("../doctors/doctor.schema");
const kafka_service_1 = require("../kafka/kafka.service");
const patient_schema_1 = require("../patients/patient.schema");
const appointment_schema_1 = require("./appointment.schema");
exports.APPOINTMENT_CREATED_TOPIC = 'appointment-created';
let AppointmentsService = class AppointmentsService {
    model;
    patients;
    doctors;
    kafka;
    constructor(model, patients, doctors, kafka) {
        this.model = model;
        this.patients = patients;
        this.doctors = doctors;
        this.kafka = kafka;
    }
    async create(dto) {
        const patient = await this.patients.findById(dto.patient);
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const doctor = await this.doctors.findById(dto.doctor);
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        const date = new Date(dto.date);
        await this.assertSlotFree(dto.doctor, date);
        const appt = await this.model.create({ ...dto, date });
        await this.kafka.publish(exports.APPOINTMENT_CREATED_TOPIC, {
            appointmentId: appt._id.toString(),
            patientName: patient.name,
            patientEmail: patient.email,
            doctorName: doctor.name,
            date: date.toISOString(),
        }, appt._id.toString());
        return appt;
    }
    findAll(filter = {}) {
        const q = {};
        const keys = ['status', 'doctor', 'patient'];
        for (const k of keys) {
            const value = filter[k];
            if (value) {
                q[k] = value;
            }
        }
        return this.model.find(q).populate('patient doctor').sort({ date: 1 }).exec();
    }
    async findOne(id) {
        const a = await this.model.findById(id).populate('patient doctor').exec();
        if (!a)
            throw new common_1.NotFoundException('Appointment not found');
        return a;
    }
    async update(id, dto) {
        const existing = await this.model.findById(id);
        if (!existing)
            throw new common_1.NotFoundException('Appointment not found');
        if (dto.date)
            await this.assertSlotFree(existing.doctor.toString(), new Date(dto.date), id);
        Object.assign(existing, dto, dto.date ? { date: new Date(dto.date) } : {});
        return existing.save();
    }
    async remove(id) {
        const a = await this.model.findByIdAndDelete(id).exec();
        if (!a)
            throw new common_1.NotFoundException('Appointment not found');
        return { deleted: true };
    }
    async assertSlotFree(doctorId, date, ignoreId) {
        const clash = await this.model.exists({
            doctor: doctorId,
            date,
            status: { $ne: 'cancelled' },
            ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
        });
        if (clash)
            throw new common_1.ConflictException('Doctor already has an appointment at that time');
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __param(1, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __param(2, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model, mongoose_2.Model, kafka_service_1.KafkaService])
], AppointmentsService);
