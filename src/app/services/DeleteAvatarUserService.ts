//Os services no curso estão sendo chamados de useCases

import { Injectable } from "@nestjs/common";
import { AvatarRepository } from "../repositories/AvatarRepository";
import * as fs  from 'fs';

interface DeleteAvatarUserProps {
 userId: string
}
//Necessário utilizar o Injectable para qualquer providers que utilizamos nos modules
//O código antes do injectable, era um código limpo que poderia ser utilizado em qualquer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
@Injectable()
export class DeleteAvatarUserService {

  //O atributo poderia ser declarado no construct, colocando private antes de UserRepository
  constructor(private userRepository: AvatarRepository){
    this.userRepository = userRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(props: DeleteAvatarUserProps): Promise<void>{

    const {userId} = props;

    try{

      await this.userRepository.deleteByUserId(userId);

      await fs.promises.unlink(`./assets/avatar_${userId}.png`);

    }catch(err){
      //console.log(err);
      throw new Error("Error delete users avatar");
    }

  }
}