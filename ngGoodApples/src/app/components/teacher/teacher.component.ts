import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Classroom } from 'src/app/models/classroom';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  loggedInUser: User = new User();
  classes: Classroom[] = [];

constructor(
  private auth: AuthService, private router: Router, private classroomService: ClassroomService
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

}
