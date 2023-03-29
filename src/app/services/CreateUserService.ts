//Os services no curso estão sendo chamados de useCases

import { UserCreatedEvent } from "@application/events/userCreated.event";
import { Injectable, Inject } from "@nestjs/common";
//import { ClientProxy } from "@nestjs/microservices";
import {EventEmitter2} from '@nestjs/event-emitter';
import { ClientProxy } from "@nestjs/microservices";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string; 
}

interface CreateUserResponse {
  user: User;
}

//Necessário utilizar o Injectable para qualquer providers que utilizamos nos modules
//O código antes do injectable, era um código limpo que poderia ser utilizado em qualquer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
@Injectable()
export class CreateUserService {

  //O atributo poderia ser declarado no construct, colocando private antes de UserRepository
  constructor(private userRepository: UserRepository,  private eventEmitter: EventEmitter2, 
    @Inject('USER_SERVICE') private readonly client: ClientProxy){
    this.userRepository = userRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(props: CreateUserProps): Promise<CreateUserResponse>{

    try{

      const {firstName, lastName, email} = props;

      const user = new User({
        firstName,
        lastName,
        email
      });

          //Persistir user no BD
    const createdUser = await this.userRepository.create(user);

    const userCreatedEvent = new UserCreatedEvent(createdUser.email, createdUser.firstName);
    
    this.eventEmitter.emit('user.created', userCreatedEvent);

    //send método não cria a fila se não existir, já o emit cria.
    this.client.emit('user created', JSON.stringify(createdUser));

    /*Retornamos como um objeto, porque se for necessário retornar mais coisas futuramente, não precisamos alterar a interface,
    que ainda retornará um objeto, porém com mais atributos*/
    return {
      user: createdUser,
    };

      
    }catch(err){
        throw new Error('An error occurred while registering the user');          
    }

  }
}