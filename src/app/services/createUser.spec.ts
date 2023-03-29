import { User } from "@application/entities/User";
import { makeUser } from "@test/factories/userFactory";
import { inMemoryUserRepository } from "../../../test/repositories/inMemoryUserRepository";

//import * from 'axios';

export interface ClientProxy {
  send(pattern: string, simulation: any): any;
  connect(): any;
  close(): any;
  routingMap(): any;
}


describe('Create User', () => {

  it('should be possible crate an user', async () => {

    const userRepository = new inMemoryUserRepository();

    //Necessary mock EventEmitter and ClientProxy
    //const createUser = new CreateUserService(userRepository, new EventEmitter2(), null);
  
   const user = makeUser({
      firstName: 'João Victor',
      lastName: 'Morgado Viana',
      email: 'joaovictorv9820@gmail.com',
    });

    await userRepository.create(user);
    //console.log(userRepository.users);
  
    expect(userRepository.users).toHaveLength(1);
    expect(user).toEqual(userRepository.users[0]);

  });

});