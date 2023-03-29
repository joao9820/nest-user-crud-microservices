import { Module } from "@nestjs/common";
import { UserRepository } from "@application/repositories/UserRepository";
import {MongooseModule} from '@nestjs/mongoose';
import { User, UserSchema } from "./mongo/schemas/user.schema";
import { Avatar, AvatarSchema } from "./mongo/schemas/avatar.schema";
import MongoUserRepository from "./mongo/repositories/MongoUserRepository";
import { AvatarRepository } from "@application/repositories/AvatarRepository";
import MongoAvatarRepository from "./mongo/repositories/MongoAvatarRepository";

//Toda vez que uma classe precisar de NotificationRepository, devolveremos PrismaNotificationRepository
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Avatar.name, schema: AvatarSchema }])],
  providers: [{
    provide: UserRepository,
    useClass: MongoUserRepository
  }, 
  {
    provide: AvatarRepository,
    useClass: MongoAvatarRepository,
  }],
  //Exportamos NotificationRepository para os modulos que implementarem esse module database, possa utilizá-lo
  exports: [UserRepository, AvatarRepository]
})
export class DataBaseModule {}