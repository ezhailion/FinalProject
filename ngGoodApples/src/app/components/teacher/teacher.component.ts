import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Classroom } from 'src/app/models/classroom';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  loggedInUser: User = new User();
  classes: Classroom[] = [];

  selectedStudents: Student[] | null = null;
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
    this.loadAllClasses();

    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (oops) => {
        console.error('TeacherComponent.getLoggedInUser() failed getting logged in user')
        console.error(oops)
      }
    })


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
      next: (students) => {
        this.selectedStudents = students;
      },
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
