import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsService {
    private readonly model;
    constructor(model: Model<DoctorDocument>);
    create(dto: CreateDoctorDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(specialization?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateDoctorDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Doctor, {}, import("mongoose").DefaultSchemaOptions> & Doctor & {
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
