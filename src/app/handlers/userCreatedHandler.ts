import { Injectable } from '@nestjs/common';
import { SendEmailService } from '../services/SendEmailService';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@application/events/userCreated.event';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class UserCreatedHandler {
  constructor(
    private readonly mailService: SendEmailService,
    //private readonly eventEmitter: EventEmitter2,
  ) {}

  //@EventPattern('user.created')
  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    //console.log('event triggered');
    await this.mailService.sendEmail(
      event.email,
      'User created sucessfully',
      `Thank you for joining our team  ${event.firstName}!`,
    );
  }
}
