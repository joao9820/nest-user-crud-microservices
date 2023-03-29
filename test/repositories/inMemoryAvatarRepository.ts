import { Avatar } from "@application/entities/Avatar";
import { AvatarRepository } from "@application/repositories/AvatarRepository";


export class inMemoryAvatarRepository implements AvatarRepository {
  
  public avatars: Avatar[] = [];

  async findAvatarByUserId(userId: string): Promise<Avatar | null> {
    return this.avatars.find((avt) => avt.userId === userId) || null;
  }

  async deleteByUserId(userId: string): Promise<void> {

    const key = this.avatars.findIndex((avt) => avt.userId === userId);

    this.avatars.splice(key, 1);

  }

  async create(avatar: Avatar): Promise<Avatar> {
    this.avatars.push(avatar);

    return avatar;

  }
};