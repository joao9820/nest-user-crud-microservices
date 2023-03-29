//Os services no curso estão sendo chamados de useCases

import { HttpModule } from "@nestjs/axios";
import { HttpService } from "@nestjs/axios/dist";
import { Injectable } from "@nestjs/common";
import { Avatar, AvatarProps } from "../entities/Avatar";
import { AvatarRepository } from "../repositories/AvatarRepository";
import { catchError, firstValueFrom } from 'rxjs';
import * as fs from 'fs';

interface FindAvatarProps {
  userId: string;
}

type FindAvatarResponse = {
  avatar: string | null;
};

@Injectable()
export class FindAvatarService {

  constructor(private avatarRepository: AvatarRepository, private httpService: HttpService){
    this.avatarRepository = avatarRepository;
    this.httpService = httpService;
  }

  //Princípio da funcionalidade única do solid
  async execute(request: FindAvatarProps): Promise<FindAvatarResponse>{

    const {userId} = request;

    let existentAvatar: Avatar | null;

    try{

      if(existentAvatar = await this.avatarRepository.findAvatarByUserId(userId)){

        return {
          avatar: existentAvatar.file
        }
  
      }
  
      //console.log('passou aqui');
  
      const pathAvatar = `./assets/avatar_${userId}.png`;
  
      const file = fs.createWriteStream(pathAvatar);
  
      const {data} = await firstValueFrom(this.httpService.get(`https://reqres.in/api/users/${userId}`).pipe());
  
      let {data: dataUser} = data;
  
      await this.downloadAvatar(dataUser.avatar, file);
  
      //Read and convert to base64
      const fileMongo = await fs.promises.readFile(pathAvatar, {encoding: 'base64'});
      
      //Create a new Avatar object
      const avatar = new Avatar({userId, file: fileMongo});
  
      const createdAvatar = await this.avatarRepository.create(avatar);
  
      avatar.id = createdAvatar.id;
  
      return {
        avatar: createdAvatar.file
      }


    }catch(err){

      throw new Error('An Error ocurred while searching avatar user');
    }

  }

  private async downloadAvatar(avatarUrl: string, file: fs.WriteStream): Promise<void>{

    const response = await this.httpService.axiosRef({
      url: avatarUrl,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(file);

  }
}