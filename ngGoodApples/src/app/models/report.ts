import { Behavior } from "./behavior";
import { Student } from "./student";

export class Report {
  id: number;
  notes: string;
  createDate: string;
  lastUpdate:string;
  enabled: boolean;

  behaviors : Behavior[];
  student : Student;

  constructor(
  id: number = 0,
  notes: string = '',
  createDate: string = '',
  lastUpdate:string = '',
  enabled: boolean = false,
  behaviors : Behavior[] = [],
  student : Student = new Student()
  ) {
    this.id = id;
    this.notes = notes;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
    this.behaviors = behaviors;
    this.student = student;
  }
}
