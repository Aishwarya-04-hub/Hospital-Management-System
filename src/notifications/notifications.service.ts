import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { APPOINTMENT_CREATED_TOPIC } from '../appointments/appointments.service';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class NotificationsService implements OnModuleInit {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly sent: any[] = [];

  constructor(private readonly kafka: KafkaService) {}

  async onModuleInit() {
    await this.kafka.subscribe(APPOINTMENT_CREATED_TOPIC, 'notification-group', (e) => this.handle(e));
  }

  private handle(event: any) {
    const message = `Hi ${event.patientName}, your appointment with ${event.doctorName} is booked for ${event.date}.`;
    this.logger.log(`[EMAIL to ${event.patientEmail}] ${message}`);
    this.sent.push({ to: event.patientEmail, message, appointmentId: event.appointmentId, at: new Date() });
  }

  list() { return this.sent; }
}