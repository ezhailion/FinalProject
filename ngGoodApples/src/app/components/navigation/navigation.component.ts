import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isCollapsed: boolean = false;
  display : boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  checkUserRole(): string {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        return user.role;
      },
      error: (oops) => {
        console.error(
          'NavigationComponent.checkUserRole() failed getting logged in user'
        );
        console.error(oops);
      },
    });
    return '';
  }

  isLoggedIn() {
    return this.auth.checkLogin();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
