import { HydratedDocument, Types } from 'mongoose';
export type AppointmentDocument = HydratedDocument<Appointment>;
export declare const APPOINTMENT_STATUSES: string[];
export declare class Appointment {
    patient: Types.ObjectId;
    doctor: Types.ObjectId;
    date: Date;
    reason?: string;
    status: string;
}
export declare const AppointmentSchema: import("mongoose").Schema<Appointment, import("mongoose").Model<Appointment, any, any, any, any, any, Appointment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    patient?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    doctor?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    date?: import("mongoose").SchemaDefinitionProperty<Date, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string | undefined, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Appointment>;
