//Aqui não foi possível colocar o alias path de test, não encontra o inMemorynotificationRepository
import { makeUser } from "@test/factories/userFactory";
import { inMemoryUserRepository } from "../../../test/repositories/inMemoryUserRepository";
import { FindUserService} from "./FindUserService";
import { HttpService } from "@nestjs/axios/dist";

describe('Find a unique user', () => {

  it('should be possible find an user by id', async () => {

    const userRepository = new inMemoryUserRepository();

    //Para fazer o teste, registramos em nosso inMemoryDB 3 notificações, sendo 2 do mesmo recipient que buscaremos

    await userRepository.create(makeUser({firstName: 'user-2'}, 'user-2-id'));
    await userRepository.create(makeUser({firstName: 'user-1'}, 'user-1-id'));
    await userRepository.create(makeUser({firstName: 'user-3'}, 'user-3-id'));

    //console.log(userRepository.users);


    const findUser = new FindUserService(userRepository, new HttpService);
  
    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    const {user: foundUser} = await findUser.execute({
      userId: 'user-1-id'
    });

    //console.log(foundUser);
  
    expect(foundUser).toBeTruthy();
    //o _id é a mesma coisa de id quando comparamos
    expect(foundUser).toHaveProperty('id', 'user-1-id');
  });

});