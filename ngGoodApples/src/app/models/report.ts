export class Report {
  id: number;
  notes: string;
  createDate: string;
  lastUpdate:string;
  enabled: boolean;

  constructor(
    id: number = 0,
  notes: string = '',
  createDate: string = '',
  lastUpdate:string = '',
  enabled: boolean = false,
  ) {
    this.id = id;
    this.notes = notes;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.enabled = enabled;
  }
}
