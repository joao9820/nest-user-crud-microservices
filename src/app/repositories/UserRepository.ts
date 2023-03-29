import { User } from "../entities/User";

//O nest lida melhor com classes abstratas para inversão de dependências do que interfaces
export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
}