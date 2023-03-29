//Os services no curso estão sendo chamados de useCases

import { HttpModule } from "@nestjs/axios";
import { HttpService } from "@nestjs/axios/dist";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from "axios";

interface FindUserProps {
  userId: string;
}

type FindUserResponse = {
  user: User | null;
};

@Injectable()
export class FindUserService {

  constructor(private userRepository: UserRepository, private httpService: HttpService){
    this.userRepository = userRepository;
    this.httpService = httpService;
  }

  //Princípio da funcionalidade única do solid
  async execute(request: FindUserProps): Promise<FindUserResponse>{

    const {userId} = request;


    const {data} = await firstValueFrom(this.httpService.get(`https://reqres.in/api/users/${userId}`).pipe(
      catchError((error: AxiosError) => {
        //console.log(error.response?.data)
        throw 'An error happened!';
      }),
    ));

    let {data: dataUser} = data;

    const user: User = {
      ...dataUser,
      firstName: dataUser.first_name,
      lastName: dataUser.last_name,
    }

    //console.log(data);
    //const user = await this.userRepository.findById(userId);

    return {
      user
    }

  }
}