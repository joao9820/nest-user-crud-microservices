import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema()
export class Avatar {
  @Prop({type: String, required: true})
  userId: string;
  @Prop({type: String})
  file: string;
  @Prop({type: Date, default: Date.now()})
  createdAt: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);