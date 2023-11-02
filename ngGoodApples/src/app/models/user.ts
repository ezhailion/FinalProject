import { Gender } from "./gender";
import { Student } from "./student";

export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  imageUrl: string | null;
  aboutMe: string;
  createDate: string;
  lastUpdate: string;
  gender: Gender;
  student: Student | null;


  constructor(
    id: number = 0,
    username: string = '',
    password: string = '',
    role: string = '',
    enabled: boolean = false,
    firstName: string = '',
    lastName: string = '',
    dateOfBirth: string = '',
    email: string = '',
    phone: string = '',
    imageUrl: string | null = null,
    aboutMe: string = '',
    createDate: string = '',
    lastUpdate: string = '',
    gender: Gender = new Gender(),
    student: Student | null = null

  ){
    this.id = id;
    this.username = username;
    this. password = password;
    this.role = role;
    this.enabled = enabled;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.aboutMe = aboutMe;
    this.createDate = createDate;
    this.lastUpdate = lastUpdate;
    this.gender = gender;
    this.student = student;
  }
}
