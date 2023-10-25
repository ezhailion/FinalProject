import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser: User = new User();
  invalidRegistration: boolean = false;

  constructor(private auth: AuthService, private router: Router){}

  register(user: User): void {
    console.log('Registering user:');
    console.log(user);
    this.auth.register(user).subscribe({
      next: (registeredUser) => {
        this.auth.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            if (loggedInUser.role === "teacher"){
              this.router.navigateByUrl('/teacher');
            }

            if (loggedInUser.role === "parent"){
              this.router.navigateByUrl('/parent');
            }

            if (loggedInUser.role === "student"){
            this.router.navigateByUrl('/student');
            }

            //TODO: what if (somehow) no role? 404?

          },
          error: (problem) => {
            console.error('RegisterComponent.register(): Error logging in user:');
            console.error(problem);
          }
        });
      },
      error: (oops) => {
        console.error('RegisterComponent.register(): Error registering account');
        console.error(oops);
        this.invalidRegistration = true;
      }
    });
  }

}
