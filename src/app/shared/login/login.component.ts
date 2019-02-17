import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

  constructor(
      private authService: AuthService,
      private router: Router,
      private flashMessage: FlashMessage
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
      this.authService.showLoader.emit(true); // Show loader before operation
      const user = {
          username: this.username,
          password: this.password
      };

      // Authenticate User
      this.authService.authenticateUser(user).subscribe((data: any) => {
          if(data.success) {
              this.authService.storeUserData(data.token, data.user);
              this.flashMessage.success("You have logged in successfully!", {delay: 3000});
              this.router.navigate(['/profile']);
          } else {
              this.flashMessage.danger(data.msg, {delay: 3000});
          }
      });
      this.authService.showLoader.emit(false); // Hide loader after operation

  }

}
