import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';
export declare class PatientsController {
    private readonly service;
    constructor(service: PatientsService);
    create(dto: CreatePatientDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | undefined>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdatePatientDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./patient.schema").Patient, {}, import("mongoose").DefaultSchemaOptions> & import("./patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
