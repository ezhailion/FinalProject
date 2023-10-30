import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Component } from '@angular/core';
import { Reflection } from 'src/app/models/reflection';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  constructor(
    private studentService: StudentService,
    private auth: AuthService,
    private router: Router,
  ){}

  reflections: Reflection[] = [];
  newReflection: Reflection = new Reflection();
  loggedInUser: User = new User();
  student: Student = new Student();
  newStudent: Student = new Student();

  ngOnInit() {
    console.log("on that init")
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl('mustBeLoggedIn');
    }
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(this.loggedInUser)
      },
      error: (oops) => {
        console.error(
          'StudentComponent.getLoggedInUser() failed getting logged in user'
          );
          console.error(oops);
        },
      });
      this.loadStudentForUser();
      console.log(this.student)

  }
  createReflection(reflection: Reflection) {
    this.studentService.create(reflection).subscribe({
      next: (reflection) => {
        this.newReflection = new Reflection();
      },
      error: oops => console.error("Student Component. createReflection err " + oops)
    })
  }



  loadAllReflectionsForStudent(studentId: number) {
    this.studentService.indexReflections(studentId).subscribe({
      next: (reflections) => {
        this.reflections = reflections;
        console.log(reflections);
      },
      error: oops => console.error("Student Component. loadReflections err " + oops)
    })
  }

  loadStudentForUser() {
    this.studentService.getStudentForUser().subscribe({
      next: (student) => {
        this.student = student;
        console.log(this.student)
        this.loadAllReflectionsForStudent(this.student.id);
      },
      error: oops => console.error("Student Component. loadStudent err " + oops)
    })
  }


}
