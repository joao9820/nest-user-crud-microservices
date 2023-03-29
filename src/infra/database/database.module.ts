import { Module } from "@nestjs/common";
import { UserRepository } from "@application/repositories/UserRepository";
import {MongooseModule} from '@nestjs/mongoose';
import { User, UserSchema } from "./mongo/schemas/user.schema";
import MongoUserRepository from "./mongo/repositories/MongoUserRepository";

//Toda vez que uma classe precisar de NotificationRepository, devolveremos PrismaNotificationRepository
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [{
    provide: UserRepository,
    useClass: MongoUserRepository
  }],
  //Exportamos NotificationRepository para os modulos que implementarem esse module database, possa utilizá-lo
  exports: [UserRepository]
})
export class DataBaseModule {}