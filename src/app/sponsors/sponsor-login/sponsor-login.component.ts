import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-login',
  templateUrl: './sponsor-login.component.html',
  styleUrls: ['./sponsor-login.component.scss']
})
export class SponsorLoginComponent implements OnInit {

  company_email: String;
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
    const sponsor = {
        company_email: this.company_email,
        password: this.password
    };

    // Authenticate User
    this.authService.authenticateSponsor(sponsor).subscribe((data: any) => {
        if(data.success) {
            this.authService.storeUserData(data.token, data.sponsor);
            this.flashMessage.success("You have logged in successfully!", {delay: 3000});
            this.router.navigate(['/sponsor-dashboard']);
        } else {
            this.flashMessage.danger(data.msg, {delay: 3000});
        }
    });
    this.authService.showLoader.emit(false); // Hide loader after operation

}

}
