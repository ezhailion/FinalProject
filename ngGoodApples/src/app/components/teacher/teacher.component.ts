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

  selectedStudent: Student = new Student();

  createdClass: Classroom = new Classroom();
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

    // TEMP to test full stack student getting (only 1 student in class 1)
    this.loadStudentFromClass(1, 1);
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

  loadStudentFromClass(classId: number, studentId: number) {
    this.studentService.showByClassId(classId, studentId).subscribe({
      next: student => this.selectedStudent = student,
      error: oopsiedoodles => console.error("Teach Component.loadStudent: retrieval err " + oopsiedoodles)
    })
  }

  createNewClass(classroom: Classroom) {
    this.classroomService.create(classroom).subscribe({
      next: clz => this.createdClass = clz,
      error: oops => console.error("Teach Component. createNewClass err " + oops)
    })
  }
}
