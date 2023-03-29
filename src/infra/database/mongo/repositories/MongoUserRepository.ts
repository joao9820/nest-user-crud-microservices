import { Injectable } from "@nestjs/common";
import { UserRepository } from "@application/repositories/UserRepository"
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { User as UserMongo, UserDocument } from '../schemas/user.schema';
import { User } from "@application/entities/User";

@Injectable()
export default class MongoUserRepository implements UserRepository {

  constructor(@InjectModel(UserMongo.name) private userModel: Model<UserDocument>) {}

  async delete(id: string): Promise<void> {
    await this.userModel.where({
      id
    }).deleteOne();

    //console.log(this.userModel.find());
  }

  save(notification: Notification): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAvatar(recipientId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }


  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");

    //return !notification ? null : notification;

  }

  async create(user: User): Promise<User> {


    const {id, firstName, lastName, email, avatar} = await this.userModel.create(
      {firstName: user.firstName, lastName: user.lastName, email: user.email, avatar: user.avatar}
    );

    return new User({
      firstName,
      lastName,
      email,
      avatar
    }, id);

  }

}