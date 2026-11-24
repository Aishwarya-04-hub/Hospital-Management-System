import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsController {
    private readonly service;
    constructor(service: DoctorsService);
    create(dto: CreateDoctorDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(s?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateDoctorDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./doctor.schema").Doctor, {}, import("mongoose").DefaultSchemaOptions> & import("./doctor.schema").Doctor & {
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
