//Os services no curso estão sendo chamados de useCases

import { UserCreatedEvent } from "@application/events/userCreated.event";
import { Injectable, Inject } from "@nestjs/common";
//import { ClientProxy } from "@nestjs/microservices";
import {EventEmitter2} from '@nestjs/event-emitter';
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
  constructor(private userRepository: UserRepository){
    this.userRepository = userRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(props: CreateUserProps): Promise<CreateUserResponse>{

    const {firstName, lastName, email, avatar} = props;

    const user = new User({
      firstName,
      lastName,
      email,
      avatar
    });

    //Persistir user no BD
    const createdUser = await this.userRepository.create(user);


    /*Retornamos como um objeto, porque se for necessário retornar mais coisas futuramente, não precisamos alterar a interface,
    que ainda retornará um objeto, porém com mais atributos*/
    return {
      user: createdUser,
    };

  }
}