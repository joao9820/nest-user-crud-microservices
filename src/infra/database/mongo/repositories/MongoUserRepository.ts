import { Injectable } from "@nestjs/common";
import { UserRepository } from "@application/repositories/UserRepository"
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { User as UserMongo, UserDocument } from '../schemas/user.schema';
import { User } from "@application/entities/User";

@Injectable()
export default class MongoUserRepository implements UserRepository {

  constructor(@InjectModel(UserMongo.name) private userModel: Model<UserDocument>) {}

  findAvatar(recipientId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<User> {


    const {id} = await this.userModel.create(
      {firstName: user.firstName, lastName: user.lastName, email: user.email}
    );

    //update user id
    user.id = id;

    return user;

  }

}