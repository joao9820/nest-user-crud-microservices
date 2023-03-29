
import { User, UserProps } from "@application/entities/User";

//O partial diz que todas as nossas props podem ser opcionais
type Override = Partial<UserProps>;
//Criamos uma "fábrica de notificações", para diminuir a quantidade de código descrito para criar um objeto em testes
export function makeUser(override: Override = {}, id?: string): User{
  return new User({
    firstName: 'user-1',
    lastName: 'guest',
    email: 'user@gmail.com',
    avatar: 'assets/img.png',
    ...override
  }, id);
}