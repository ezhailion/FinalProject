import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Classroom } from 'src/app/models/classroom';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  loggedInUser: User = new User();
  classes: Classroom[] = [];

  selectedStudents: Student[] = [];

constructor(
  private auth: AuthService,
  private router: Router,
  private classroomService: ClassroomService,
  private studentService: StudentService
){}

  ngOnInit() {
    if(!this.auth.checkLogin()){
      this.router.navigateByUrl("mustBeLoggedIn");
    }

    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (oops) => {
        console.error('TeacherComponent.getLoggedInUser() failed getting logged in user')
        console.error(oops)
      }
    })
    this.loadAllClasses();

    // TEMP to test full stack students getting (only class 1 exists)
    this.loadAllStudentsFromClass(1);
  }

  loadAllClasses() {
    this.classroomService.index().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: (oops) => {
        console.error('TeacherComponent.loadAllClasses(): error retrieving classes')
        console.error(oops)
      }
    })
  }

  loadAllStudentsFromClass(classId : number) {
    this.studentService.indexByClass(classId).subscribe({
      next: students => this.selectedStudents = students,
      error: oopsies => console.error("TeachComponent.loadStudents: err retriveing" + oopsies)
    })
  }
}
