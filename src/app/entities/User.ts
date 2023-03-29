import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/Replace";


export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  //avatar?: string; 
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private _id: string; //_id pois o método get pode se chamar id apenas, se fosse o mesmo nome não poderia
  private props: UserProps;

  constructor(props: Replace<UserProps, {createdAt?:Date}>, id?: string) {
    /*isso para evitar que ao criar um objeto e tentar setar um valor a um atributo
    a classe não reclame de identificadores duplicados (o que também porderia ser resolvido utilizar set e get antes de content, ex: 
      setContent seria diferente do attr content)*/
    this._id = id ?? randomUUID(); //gera o id único universal
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set id(id: string){
    this._id = id;
  } 

  public get id(){
    //Futuramente, como todas as entinties possuem um id, pode se criar uma classe separada para tal informação e importá-la
    return this._id;
  }

  /*No JS os getters e setters não precisam conter get e set no nome do método, mas é uma palava reservada que define o comportamento
  do método, facilitando a chamada*/

  public set firstName(firstName: string){
    //Uma das vantagens de setar um atribute através de um setter é que é possível realizar algum tipo de validação antes de passar o valor simplesmente
    this.props.firstName = firstName;
  }

  public get firstName(){
    return this.props.firstName;
  }

  public set lastName(lastName: string){
    //Uma das vantagens de setar um atribute através de um setter é que é possível realizar algum tipo de validação antes de passar o valor simplesmente
    this.props.lastName = lastName;
  }

  public get lastName(){
    return this.props.lastName;
  }

  public set email(category: string){
    this.props.email = this.props.email;
  }

  public get email(){
    return this.props.email;
  }

  /* public get avatar(): string | undefined{
    return this.props.avatar;
  } */

  public get createdAt(){
    return this.props.createdAt;
  }

  public get updatedAt(){
    return this.props.updatedAt;
  }

}
