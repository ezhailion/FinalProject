import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.css']
})
export class EditAccountDetailsComponent {

loggedInUser: User = new User();
register(arg0: any) {
throw new Error('Method not implemented.');
}
invalidUpdate: boolean = false;
editAccount: User | null = null;

constructor(private auth: AuthService,
   private router: Router,
   private teacherService: TeacherService) {}

  update(user: User) {
    this.teacherService.update(user).subscribe({
      next: (user) => {
        console.log(user);
      }
    })
  }

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
  }



}
