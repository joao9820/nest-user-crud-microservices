import { Injectable } from '@nestjs/common';
import { SendEmailService } from '../services/SendEmailService';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@application/events/userCreated.event';

@Injectable()
export class UserCreatedHandler {
  constructor(
    private readonly mailService: SendEmailService,
    //private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    console.log('listen event');
    await this.mailService.sendEmail(
      event.email,
      'Welcome to our app!',
      'Thank you for joining our app!',
    );
  }
}
