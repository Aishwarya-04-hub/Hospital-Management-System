import { OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
export declare class NotificationsService implements OnModuleInit {
    private readonly kafka;
    private readonly logger;
    private readonly sent;
    constructor(kafka: KafkaService);
    onModuleInit(): Promise<void>;
    private handle;
    list(): any[];
}
