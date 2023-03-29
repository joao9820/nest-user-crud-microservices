/* O conceito de dto - Data transfer Object é relacionado a objetos que carregam dados, mas não tem comportamento, apenas os carregam */

import {IsNotEmpty, IsUUID, Length} from 'class-validator';  

export class CreateUserBody {

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @Length(5, 240)
  email: string;

  /* @IsNotEmpty()
  @Length(5, 240)
  avatar: string; */
  
}