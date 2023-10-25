import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginUser: User = new User();
  invalidLogin: boolean = false;
  newUser: User = new User();
  invalidRegistration: boolean = false;

  constructor(private auth: AuthService, private router: Router,  private modalService: NgbModal){}

  login(user: User) {
    console.log('Logging in user:');
    console.log(user);
    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
        //FIXME
        //this.router.navigateByUrl('/todo');
      },
      error: (oops) => {
        console.error('HomeComponent.login(): Error logging in user:');
          console.error(oops);
          this.invalidLogin = true;
      }
    })
  }

  register(user: User): void {
    console.log('Registering user:');
    console.log(user);
    this.auth.register(user).subscribe({
      next: (registeredUser) => {
        this.auth.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            //FIXME
            //this.router.navigateByUrl('/todo');
          },
          error: (problem) => {
            console.error('HomeComponent.register(): Error logging in user:');
            console.error(problem);
          }
        });
      },
      error: (oops) => {
        console.error('HomeComponent.register(): Error registering account');
        console.error(oops);
        this.invalidRegistration = true;
      }
    });
  }


  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	}

}
