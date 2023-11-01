import { User } from "./user";

export class Message {

  id: number;
  content: string;
  createDate: string;
  lastUpdate: string;
  enabled: boolean;
  recipient : User;
  sender : User;

  messageToReplyTo : Message | null;

  read : boolean;

  constructor(
  id: number = 0,
  content: string = '',
  createDate: string = '',
  lastUpdate: string = '',
  enabled: boolean = false,
  recipient: User = new User(),
  sender: User = new User(),
  messageToReplyTo : Message | null = null,
  read : boolean = false,

  ) {
    this.id = id;
    this.content = content;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
    this.recipient = recipient;
    this.sender = sender;
    this.messageToReplyTo = messageToReplyTo;
    this.read = read;
  }

}
