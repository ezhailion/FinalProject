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

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	}

}
