export class Reflection {

  id: number;
  scale: number;
  content: string;
  createDate: string;
  lastUpdate: string;
  enabled: false;

  constructor(
    id: number = 0,
  scale: number = 0,
  content: string = '',
  createDate: string = '',
  lastUpdate: string = '',
  enabled: false = false,
  ) {
    this.id = id;
    this.scale = scale;
    this.content = content;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
  }
}
