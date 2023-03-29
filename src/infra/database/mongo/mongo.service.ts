import {Model} from 'mongoose';
import { Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

/* Quando utilizamos OnModuleInit nós podemos implementar o método onModuleInit que basicamente avisa ao nest para assim que a aplicação iniciar
ele execute algo, nesse caso, realize a conexão com o prisma */
@Injectable()
export class MongoService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

   async create(user: UserDocument): Promise<UserDocument> {
    const cratedUser = new this.userModel(user);
    return cratedUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}