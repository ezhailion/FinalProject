import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginUser: User = new User ();
  newUser: User = new User();
  invalidRegistration: boolean = false;
  invalidLogin: boolean = false;
  modalReference: NgbModalRef | null = null;

  constructor(private auth: AuthService, private router: Router, private modalService: NgbModal){}

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

  login(user: User) {
    console.log('Logging in user:');
    console.log(user);
    this.invalidLogin = false;
    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
        this.auth.loginUser = loggedInUser;
        if (loggedInUser.role === 'teacher') {
          this.router.navigateByUrl('/teacher');
        }

        if (loggedInUser.role === 'parent') {
          this.router.navigateByUrl('/parent');
        }

        if (loggedInUser.role === 'student') {
          this.router.navigateByUrl('/student');
        }
        this.modalReference?.close();
        // this.modalServiceActive.close("content");
      },

      error: (oops) => {
        console.error('HomeComponent.login(): Error logging in user:');
        console.error(oops);
        this.invalidLogin = true;
      },
    })

  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
