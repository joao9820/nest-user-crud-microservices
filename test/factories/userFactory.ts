
import { User, UserProps } from "@application/entities/User";


type Override = Partial<UserProps>;

export function makeUser(override: Override = {}, id?: string): User{
  return new User({
    firstName: 'user-1',
    lastName: 'guest',
    email: 'user@gmail.com',
    ...override
  }, id);
}