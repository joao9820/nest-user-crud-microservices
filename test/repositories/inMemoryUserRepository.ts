import { User } from "@application/entities/User";
import { UserRepository } from "@application/repositories/UserRepository";

/*Para testes, é possível simular que esse array é o nosso BD, isso por conta da inversão de dependências, pois quem diz qual classe
será utilizada é quem realiza a chamada (sendNotification.spec) e não a própria classe (sendNotificationService), 
desacoplamento entre camadas*/

export class inMemoryUserRepository implements UserRepository {

  

  public users: User[] = [];

  /* async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id);

    if(!user)
      return null;

    return user;
  } */

  /* async getByRecipient(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((noti) => noti.recipientId === recipientId);
  }

  async countManyByRecipient(recipientId: string): Promise<number> {
    
    return this.notifications.filter((noti) => noti.recipientId === recipientId).length;

  } */

 /*  async create(user: User): Promise<User> {
     this.users.push(user);

     return user;
  } */
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
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
};