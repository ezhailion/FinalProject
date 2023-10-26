import { User } from "./user";

export class Student {
  id: number;
  accommodations : string;
  nickname : string;
  whoami : User;

  constructor(
    id: number = 0,
    accommodations : string = '',
    nickname : string = '',
    whoami : User = new User ()

  ) {
    this.id = id;
    this.accommodations = accommodations;
    this.nickname = nickname;
    this.whoami = whoami;

  }

}
