import { HydratedDocument } from 'mongoose';
export type PatientDocument = HydratedDocument<Patient>;
export declare class Patient {
    name: string;
    email: string;
    age: number;
    gender?: string;
    phone?: string;
}
export declare const PatientSchema: import("mongoose").Schema<Patient, import("mongoose").Model<Patient, any, any, any, any, any, Patient & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Patient, import("mongoose").Document<unknown, {}, Patient, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Patient & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Patient, import("mongoose").Document<unknown, {}, Patient, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Patient, import("mongoose").Document<unknown, {}, Patient, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    age?: import("mongoose").SchemaDefinitionProperty<number, Patient, import("mongoose").Document<unknown, {}, Patient, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    gender?: import("mongoose").SchemaDefinitionProperty<string | undefined, Patient, import("mongoose").Document<unknown, {}, Patient, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | undefined, Patient, import("mongoose").Document<unknown, {}, Patient, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Patient & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Patient>;
