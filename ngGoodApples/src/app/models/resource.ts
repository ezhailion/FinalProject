export class Resource {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
  createDate: string;
  enabled: boolean;

  constructor(
    id: number = 0,
  title: string = '',
  link: string = '',
  imageUrl: string = '',
  createDate: string = '',
  enabled: boolean = false,
  )
 {
  this.id = id;
  this.title = title;
  this.link = link;
  this.imageUrl = imageUrl;
  this.createDate = createDate;
  this. enabled = enabled;
 }
}
