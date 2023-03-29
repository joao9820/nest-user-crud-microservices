//Aqui não foi possível colocar o alias path de test, não encontra o inMemorynotificationRepository
import { makeUser } from "@test/factories/userFactory";
import { inMemoryUserRepository } from "../../../test/repositories/inMemoryUserRepository";
import { DeleteUserService } from "./DeleteUserService";

describe('Delete User', () => {

  it('should be possible delete an user', async () => {

    const userRepository = new inMemoryUserRepository();

    const user = makeUser();

    userRepository.create(user);

    const deleteUser = new DeleteUserService(userRepository);
  
    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    await deleteUser.execute({
      userId: user.id
    });
  
    //Esperamos que a única notificação criada (in memory) possua o campo canceledAt igual a qualquer Date
    expect(userRepository.users.length).toBeFalsy();

  });

});