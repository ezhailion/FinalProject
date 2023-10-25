export class Classroom {

  id: number;
  name: string;
  startTime: string;
  endTime: string;
  enabled: boolean;

  constructor(

    id: number = 0,
  name: string = "",
  startTime: string = "",
  endTime: string = "",
  enabled: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.enabled = enabled;
  }
}
