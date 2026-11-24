import { HydratedDocument } from 'mongoose';
export type DoctorDocument = HydratedDocument<Doctor>;
export declare class Doctor {
    name: string;
    specialization: string;
    email: string;
}
export declare const DoctorSchema: import("mongoose").Schema<Doctor, import("mongoose").Model<Doctor, any, any, any, any, any, Doctor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Doctor, import("mongoose").Document<unknown, {}, Doctor, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Doctor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Doctor, import("mongoose").Document<unknown, {}, Doctor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    specialization?: import("mongoose").SchemaDefinitionProperty<string, Doctor, import("mongoose").Document<unknown, {}, Doctor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Doctor, import("mongoose").Document<unknown, {}, Doctor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Doctor>;
