
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, Producer } from 'kafkajs';

type Handler = (payload: any) => Promise<void> | void;

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {

  private readonly logger = new Logger(KafkaService.name);
  private readonly enabled: boolean;

  private kafka!: Kafka;
  private producer!: Producer;
  private consumers: Consumer[] = [];

  private localHandlers = new Map<string, Handler[]>();

  constructor(private readonly config: ConfigService) {
    this.enabled = this.config.get('KAFKA_ENABLED') === 'true';
  }

  async onModuleInit() {

    if (!this.enabled) {
      this.logger.warn(
        'Kafka disabled (KAFKA_ENABLED=false) - using in-process event bus'
      );
      return;
    }

    const broker = this.config.get<string>('KAFKA_BROKER');

    if (!broker) {
      throw new Error('KAFKA_BROKER is not configured');
    }

    this.kafka = new Kafka({
      clientId: 'hospital-api',
      brokers: [broker]
    });

    this.producer = this.kafka.producer();

    await this.producer.connect();

    this.logger.log('Kafka producer connected');
  }

  async publish(topic: string, payload: object, key?: string) {

    if (!this.enabled) {
      for (const handler of this.localHandlers.get(topic) ?? []) {
        await handler(payload);
      }
      return;
    }

    await this.producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(payload)
        }
      ]
    });
  }

  async subscribe(
    topic: string,
    groupId: string,
    handler: Handler
  ): Promise<void> {

    if (!this.enabled) {
      this.localHandlers.set(topic, [
        ...(this.localHandlers.get(topic) ?? []),
        handler
      ]);
      return;
    }

    const consumer = this.kafka.consumer({ groupId });

    await consumer.connect();

    await consumer.subscribe({
      topic,
      fromBeginning: true
    });

    await consumer.run({
      eachMessage: async ({ message }) => {

        if (!message.value) {
          return;
        }

        const payload = JSON.parse(message.value.toString());

        await handler(payload);
      }
    });

    this.consumers.push(consumer);
  }

  async onModuleDestroy() {

    if (!this.enabled) {
      return;
    }

    await this.producer?.disconnect();

    await Promise.all(
      this.consumers.map(consumer => consumer.disconnect())
    );
  }
}
