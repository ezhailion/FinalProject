import { Behavior } from "./behavior";
import { Student } from "./student";
import { User } from "./user";

export class Report {
  id: number;
  notes: string;
  createDate: string;
  lastUpdate:string;
  enabled: boolean;

  behaviors : Behavior[];
  student : Student;
  teacher: User;

  constructor(
  id: number = 0,
  notes: string = '',
  createDate: string = '',
  lastUpdate:string = '',
  enabled: boolean = false,
  behaviors : Behavior[] = [],
  student : Student = new Student(),
  teacher : User = new User()
  ) {
    this.id = id;
    this.notes = notes;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
    this.behaviors = behaviors;
    this.student = student;
    this.teacher = teacher;
  }
}
