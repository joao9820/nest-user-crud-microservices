import { User } from "./User";

//Categorização dos testes
describe('User', () => {

    //Cria um caso de teste
    //podemos usar o método test ou it, se tivessemos escrevemos os casos de testes em ingles, facilitaria a leitura, it should be...
  it('should possible crate a new user', () => {

    const user = new User({firstName: 'João Victor', lastName: 'Morgado Viana', email: 'joaovictorv9820@gmail.com', avatar: 'assets/img.png'});

    //Espera receber algo diferente de Falsy (Null, undefined, '', 0, Nan, etc.)
    expect(user).toBeTruthy();

  });

});

