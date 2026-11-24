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
var KafkaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const kafkajs_1 = require("kafkajs");
let KafkaService = KafkaService_1 = class KafkaService {
    config;
    logger = new common_1.Logger(KafkaService_1.name);
    enabled;
    kafka;
    producer;
    consumers = [];
    localHandlers = new Map();
    constructor(config) {
        this.config = config;
        this.enabled = this.config.get('KAFKA_ENABLED') === 'true';
    }
    async onModuleInit() {
        if (!this.enabled) {
            this.logger.warn('Kafka disabled (KAFKA_ENABLED=false) - using in-process event bus');
            return;
        }
        this.kafka = new kafkajs_1.Kafka({ clientId: 'hospital-api', brokers: [this.config.get('KAFKA_BROKER')] });
        this.producer = this.kafka.producer();
        await this.producer.connect();
        this.logger.log('Kafka producer connected');
    }
    async publish(topic, payload, key) {
        if (!this.enabled) {
            for (const h of this.localHandlers.get(topic) ?? [])
                await h(payload);
            return;
        }
        await this.producer.send({ topic, messages: [{ key, value: JSON.stringify(payload) }] });
    }
    async subscribe(topic, groupId, handler) {
        if (!this.enabled) {
            this.localHandlers.set(topic, [...(this.localHandlers.get(topic) ?? []), handler]);
            return;
        }
        const consumer = this.kafka.consumer({ groupId });
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => handler(JSON.parse(message.value.toString())),
        });
        this.consumers.push(consumer);
    }
    async onModuleDestroy() {
        if (!this.enabled)
            return;
        await this.producer?.disconnect();
        await Promise.all(this.consumers.map((c) => c.disconnect()));
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = KafkaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KafkaService);
