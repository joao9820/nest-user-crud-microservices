
import { inMemoryUserRepository } from "../../../test/repositories/inMemoryUserRepository";
import { CreateUserService } from "./CreateUserService";
//import * from 'axios';

describe('Create User', () => {

  it('should be possible crate an user', async () => {

    const userRepository = new inMemoryUserRepository();

    const createUser = new CreateUserService(userRepository);

    //call reqress
   /*  var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reqres.in/api/products/3", true);
    xhr.data
    xhr.onload = function(){
        console.log(xhr.responseText);
    };
    xhr.send(); */
  
   const {user} = await createUser.execute({
      firstName: 'João Victor',
      lastName: 'Morgado Viana',
      email: 'joaovictorv9820@gmail.com',
      avatar: 'assets/img.png',
    });

    //console.log(userRepository.users);
  
    expect(userRepository.users).toHaveLength(1);
    expect(user).toEqual(userRepository.users[0]);

  });

});