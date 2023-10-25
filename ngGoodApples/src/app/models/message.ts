export class Message {

  id: number;
  content: string;
  createDate: string;
  lastUpdate: string;
  enabled: boolean;

  constructor(
    id: number = 0,
  content: string = '',
  createDate: string = '',
  lastUpdate: string = '',
  enabled: boolean = false,
  ) {
    this.id = id;
    this.content = content;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
  }

}
