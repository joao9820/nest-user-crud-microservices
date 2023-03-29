import { Injectable } from "@nestjs/common";
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Avatar as AvatarMongo, AvatarDocument } from '../schemas/avatar.schema';
import { AvatarRepository } from "@application/repositories/AvatarRepository";
import { Avatar } from "@application/entities/Avatar";

@Injectable()
export default class MongoAvatarRepository implements AvatarRepository {

  constructor(@InjectModel(AvatarMongo.name) private avatarModel: Model<AvatarDocument>) {}

  
  async findAvatarByUserId(userId: string): Promise<Avatar | null> {
    
    const avatar = await this.avatarModel.findOne({
      userId
    }).lean();

    if(!avatar)
      return null;

    const avatarObj = new Avatar({
      userId: avatar?.userId,
      file: avatar.file,
      createdAt: new Date(avatar.createdAt)
    });

    return avatarObj;

  }
  
  async create(avatar: Avatar): Promise<Avatar> {

    const {id} = await this.avatarModel.create(
     {userId: avatar.userId, file: avatar.file, createdAt: avatar.createdAt}
    );

    //update object id
    avatar.id = id;

    return avatar;
    
  }

  async deleteByUserId(userId: string): Promise<void> {
   await this.avatarModel.deleteMany({
    userId
   });
  }

}