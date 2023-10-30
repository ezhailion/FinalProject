import { Classroom } from "./classroom";
import { User } from "./user";

export class Student {
  id: number;
  accommodations : string;
  nickname : string;
  whoami : User;
  classes: Classroom[];

  constructor(
    id: number = 0,
    accommodations : string = '',
    nickname : string = '',
    whoami : User = new User (),
    classes: Classroom[] = []

  ) {
    this.id = id;
    this.accommodations = accommodations;
    this.nickname = nickname;
    this.whoami = whoami;
    this.classes = classes;

  }

}
