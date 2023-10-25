import { User } from "./user";

export class Student {
  id: number;
  accommodations : string;
  nickname : string;

  constructor(
    id: number = 0,
    accommodations : string = '',
    nickname : string = '',

  ) {
    this.id = id;
    this.accommodations = accommodations;
    this.nickname = nickname;

  }

}
