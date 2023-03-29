import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({type: String, required: true})
  firstName: string;
  @Prop({type: String, required: true})
  lastName: string;
  @Prop({type: String, required: true})
  email: string;
  @Prop({type: String})
  avatar: string;
  @Prop({type: Date, default: Date.now()})
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);