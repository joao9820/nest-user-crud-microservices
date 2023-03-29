//Os services no curso estão sendo chamados de useCases

import { Injectable } from "@nestjs/common";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

interface DeleteUserProps {
 userId: string
}
//Necessário utilizar o Injectable para qualquer providers que utilizamos nos modules
//O código antes do injectable, era um código limpo que poderia ser utilizado em qualquer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
@Injectable()
export class DeleteUserService {

  //O atributo poderia ser declarado no construct, colocando private antes de UserRepository
  constructor(private userRepository: UserRepository){
    this.userRepository = userRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(props: DeleteUserProps): Promise<void>{

    const {userId} = props;

    try{
      await this.userRepository.delete(userId);
    }catch(err){
      new Error('Error delete user');
    }

  }
}