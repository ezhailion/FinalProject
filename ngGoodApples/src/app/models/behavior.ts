import { BehaviorType } from "./behavior-type";

export class Behavior {
  id: number;
  description: string;
  name: string;
  behaviorType: BehaviorType;

  constructor(
    id: number = 0,
  description: string = "",
  name: string = "",
  behaviorType = new BehaviorType()
  ) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.behaviorType = behaviorType;
  }
}
