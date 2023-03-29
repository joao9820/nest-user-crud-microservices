import { Avatar } from "../entities/Avatar";

//O nest lida melhor com classes abstratas para inversão de dependências do que interfaces
export abstract class AvatarRepository {
  abstract create(Avatar: Avatar): Promise<Avatar>;
  abstract findAvatarByUserId(userId: string): Promise<Avatar | null>;
  abstract deleteByUserId(userId: string): Promise<void>;
}