import { Classroom } from "./classroom";
import { User } from "./user";

export class Student {
  id: number;
  accommodations : string;
  nickname : string;
  whoami : User;
  classrooms: Classroom[];

  constructor(
    id: number = 0,
    accommodations : string = '',
    nickname : string = '',
    whoami : User = new User (),
    classrooms: Classroom[] = []

  ) {
    this.id = id;
    this.accommodations = accommodations;
    this.nickname = nickname;
    this.whoami = whoami;
    this.classrooms = classrooms;

  }

}
