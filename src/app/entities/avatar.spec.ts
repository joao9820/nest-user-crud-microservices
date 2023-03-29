import { makeAvatar } from "@test/factories/avatarFactory";

//Categorização dos testes
describe('Avatar', () => {

    //Cria um caso de teste
    //podemos usar o método test ou it, se tivessemos escrevemos os casos de testes em ingles, facilitaria a leitura, it should be...
  it('should possible crate a new avatar', () => {
    //Espera receber algo diferente de Falsy (Null, undefined, '', 0, Nan, etc.)
    expect(makeAvatar()).toBeTruthy();

  });

});

