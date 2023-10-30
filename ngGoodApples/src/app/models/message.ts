import { User } from "./user";

export class Message {

  id: number;
  content: string;
  createDate: string;
  lastUpdate: string;
  enabled: boolean;
  recipient : User;

  constructor(
    id: number = 0,
  content: string = '',
  createDate: string = '',
  lastUpdate: string = '',
  enabled: boolean = false,
  recipient: User = new User()
  ) {
    this.id = id;
    this.content = content;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
    this.recipient = recipient;
  }

}
