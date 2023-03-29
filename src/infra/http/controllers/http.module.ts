import { Module } from "@nestjs/common";
import { CreateUserService } from "@application/services/CreateUserService";
import { FindUserService } from "@application/services/FindUserService";
import { DataBaseModule } from "@infra/database/database.module";
import { UsersController } from "./users.controller";
import {HttpModule as HttpModuleAxios} from "@nestjs/axios";
import { DeleteUserService } from "@application/services/DeleteUserService";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SendEmailService } from "@application/services/SendEmailService";
import { UserCreatedHandler } from "@application/handlers/userCreatedHandler";
import { UserCreatedEvent } from "@application/events/userCreated.event";

//O SendNotificationService precisa do NotificationRepository, então utilizamos o module de database que já nos fornece essa informação
@Module({
  imports: [DataBaseModule, HttpModuleAxios, UserCreatedEvent],
  controllers: [UsersController],
  providers: [
    CreateUserService, 
    UserCreatedHandler,
    FindUserService,
    DeleteUserService,
    SendEmailService,
  ]
})

export default class HttpModule{}