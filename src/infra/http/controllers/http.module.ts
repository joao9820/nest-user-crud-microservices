import { Module } from "@nestjs/common";
import { CreateUserService } from "@application/services/CreateUserService";
import { FindUserService } from "@application/services/FindUserService";
import { DataBaseModule } from "@infra/database/database.module";
import { UsersController } from "./users.controller";
import {HttpModule as HttpModuleAxios} from "@nestjs/axios";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SendEmailService } from "@application/services/SendEmailService";
import { UserCreatedHandler } from "@application/handlers/userCreatedHandler";
import { UserCreatedEvent } from "@application/events/userCreated.event";
import { FindAvatarService } from "@application/services/FindAvatarUserService";
import { DeleteAvatarUserService } from "@application/services/DeleteAvatarUserService";

//O SendNotificationService precisa do NotificationRepository, então utilizamos o module de database que já nos fornece essa informação
/* When app is producer, necessary Client Module */
@Module({
  imports: [DataBaseModule, HttpModuleAxios,
    ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),
],
  controllers: [UsersController],
  providers: [
    CreateUserService, 
    UserCreatedHandler,
    FindUserService,
    FindAvatarService,
    DeleteAvatarUserService,
    SendEmailService,
  ]
})

export default class HttpModule{}