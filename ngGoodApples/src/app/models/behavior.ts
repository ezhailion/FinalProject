export class Behavior {
  id: number;
  description: string;
  name: string;

  constructor(
    id: number = 0,
  description: string = "",
  name: string = "",
  ) {
    this.id = id;
    this.description = description;
    this.name = name;
  }
}
