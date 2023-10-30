import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loginUser: User = new User();
  loggedInUser: User = new User();
  invalidLogin: boolean = false;
  modalReference: NgbModalRef | null = null;
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal,

  ) {}

  ngOnInit() {
    if (this.auth.checkLogin()) {
      this.getLoggedInUser();
    }
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

  isLoggedIn() {
    return this.auth.checkLogin();
  }

  getLoggedInUser() {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (oops) => {
        console.error('HomeComponent.getLoggedInUser() failed getting logged in user')
        console.error(oops)
      }
    })
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  checkConsole() {
    console.log(this.loggedInUser)
    console.log(this.isLoggedIn());
  }
}
