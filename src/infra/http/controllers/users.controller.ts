import { Controller} from '@nestjs/common';
import { Body, Get, Param, Patch, Post, Delete } from '@nestjs/common/decorators';
import { CreateUserService } from '@application/services/CreateUserService';
import { CreateUserBody } from './dtos/create-user-body';
import { FindUserService } from '@application/services/FindUserService';
import UserControllerMapper from './mapper/UserControllerMapper';
import { DeleteUserService } from '@application/services/DeleteUserService';
import { UserCreatedEvent } from '@application/events/userCreated.event';
import { EventEmitter2 } from '@nestjs/event-emitter';


//O nestjs utiliza um conceito chamado decorator através do '@' os decorators (decorar) acoplam funcionamento de uma maneira mágica à aplicação
//O decorator Controller transforma a classe a baixo em uma controller
@Controller('api/user')
export class UsersController {
  /*O next utiliza a inversão de dependência ao invés do app.controller buscar a funcionalidade em outro arquivo,
  ele recebe a funcionalidade como um parâmetro quando a classe será instanciada semelhante ao pattern repository do laravel*/
  constructor(private createUser: CreateUserService, 
    private findUser: FindUserService, private deleteUser: DeleteUserService, private eventEmitter: EventEmitter2) {}


  @Get('/:userId')
  async show(@Param('userId') userId: string){
    const {user} = await this.findUser.execute({
     userId: userId
    });

   /*  try{

      const resp = await fetch('https://reqres.in/api/users/2');

      const data = await resp.json();
			console.log(data);

    }catch(err){
      console.log(err);
    } */
    

    return user ? UserControllerMapper.toHttp(user) : null;
  }
  
  //Como se fosse um Path, pois devemos no primeiro request, 
  @Get('/:userId/avatar')
  async findAvatar(@Param('userId') userId: string){

    try{
      const {user} = await this.findUser.execute({
        userId: userId
       });
   
       return user ? UserControllerMapper.toHttp(user) : null;

    }catch(err){
      return {error: err}
    }
    
  }

  //Para obter o corpo da requisição, o nest também utiliza decorators nesse caso um que se chama body
  @Post('/')
  async create(@Body() body: CreateUserBody){

    const {first_name, last_name, email, avatar} = body;

    const {user} = await this.createUser.execute({
      firstName: first_name, lastName: last_name, email, avatar
    });

    const userCreatedEvent = new UserCreatedEvent('<h1>Hello</h1>');
    this.eventEmitter.emit('user_created', userCreatedEvent);

    return {
        user: UserControllerMapper.toHttp(user),
    };

  }

  @Delete('/:userId/avatar')
  async delete(@Param('userId') userId: string){

    try{

      this.deleteUser.execute({userId});

      return true;

    }catch(err){

      return err;
    }

  }

}
