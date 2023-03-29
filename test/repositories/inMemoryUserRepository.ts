import { User } from "@application/entities/User";
import { UserRepository } from "@application/repositories/UserRepository";

/*Para testes, é possível simular que esse array é o nosso BD, isso por conta da inversão de dependências, pois quem diz qual classe
será utilizada é quem realiza a chamada (sendNotification.spec) e não a própria classe (sendNotificationService), 
desacoplamento entre camadas*/

export class inMemoryUserRepository implements UserRepository {

  

  public users: User[] = [];

  findAvatar(recipientId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    this.users.pop();
  }
  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;

  }
};