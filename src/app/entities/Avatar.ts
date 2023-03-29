import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/Replace";


export interface AvatarProps {
  userId: string;
  file: string;
  createdAt: Date;
}

export class Avatar {
  private _id: string; //_id pois o método get pode se chamar id apenas, se fosse o mesmo nome não poderia
  private props: AvatarProps;

  constructor(props: Replace<AvatarProps, {createdAt?:Date}>, id?: string) {
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
    return this._id;
  }

  public set userId(userId: string){
    this.props.userId = userId;
  }

  public get userId(){
    return this.props.userId
  }
  
  public set file(file: string){
    this.props.file = file;
  }

  public get file(){
    return this.props.file
  }

  //Não precisamos de um método set para data de criação, apenas precisamos buscar esse valor que é setado pelo próprio DB
  public get createdAt(){
    return this.props.createdAt;
  }

}
