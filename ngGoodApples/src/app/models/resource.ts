import { Behavior } from './behavior';
export class Resource {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
  createDate: string;
  enabled: boolean;

  behavior : Behavior;

  constructor(
    id: number = 0,
  title: string = '',
  link: string = '',
  imageUrl: string = '',
  createDate: string = '',
  enabled: boolean = false,
  behavior : Behavior = new Behavior,
  )
 {
  this.id = id;
  this.title = title;
  this.link = link;
  this.imageUrl = imageUrl;
  this.createDate = createDate;
  this. enabled = enabled;
  this.behavior = behavior;
 }
}
