import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type Handler = (payload: any) => Promise<void> | void;
export declare class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly config;
    private readonly logger;
    private readonly enabled;
    private kafka;
    private producer;
    private consumers;
    private localHandlers;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    publish(topic: string, payload: object, key?: string): Promise<void>;
    subscribe(topic: string, groupId: string, handler: Handler): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
export {};
