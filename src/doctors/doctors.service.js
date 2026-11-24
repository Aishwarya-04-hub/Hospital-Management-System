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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctor_schema_1 = require("./doctor.schema");
let DoctorsService = class DoctorsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        try {
            return await this.model.create(dto);
        }
        catch (e) {
            if (e.code === 11000)
                throw new common_1.ConflictException('Doctor email already exists');
            throw e;
        }
    }
    findAll(specialization) {
        return this.model.find(specialization ? { specialization } : {}).exec();
    }
    async findOne(id) {
        const d = await this.model.findById(id).exec();
        if (!d)
            throw new common_1.NotFoundException('Doctor not found');
        return d;
    }
    async update(id, dto) {
        const d = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!d)
            throw new common_1.NotFoundException('Doctor not found');
        return d;
    }
    async remove(id) {
        const d = await this.model.findByIdAndDelete(id).exec();
        if (!d)
            throw new common_1.NotFoundException('Doctor not found');
        return { deleted: true };
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DoctorsService);
