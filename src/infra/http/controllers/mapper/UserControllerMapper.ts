import { User } from "@application/entities/User";


export default class UserControllerMapper {
  static toHttp(user: User){

    return JSON.stringify({
      id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        avatar: user.avatar,
    });
  }
}