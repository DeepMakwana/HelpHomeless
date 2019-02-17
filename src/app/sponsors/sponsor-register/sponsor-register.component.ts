import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-register',
  templateUrl: './sponsor-register.component.html',
  styleUrls: ['./sponsor-register.component.scss']
})
export class SponsorRegisterComponent implements OnInit {

  company_name: String;
  password: String;
  company_email: String;

  constructor( private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessage) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    this.authService.showLoader.emit(true); // Show loader before operation

    const sponsor = {
        company_name: this.company_name,
        company_email: this.company_email,
        password: this.password,
    }

    // Validare Email
    if(!this.validateService.validateEmail(sponsor.company_email)) {
        this.flashMessage.danger("Please enter a valid email", {delay: 3000});
        return false;
    }

    // Register User
    this.authService.registerSponsor(sponsor).subscribe((data: any) => {
        if(data.success) {
            this.flashMessage.success("Registration Completed! Please Log In.", {delay: 3000});
            this.router.navigate(['/sponsor-login']);
        } else {
            this.flashMessage.danger("Something Went Wrong!", {delay: 3000});
            this.router.navigate(['/register']);
        }
    });
    this.authService.showLoader.emit(false); // Hide loader after operation
}

    // Check User
checkCompanyName(){
    this.validateService.checkCompanyName(this.company_name).subscribe((result: any)=>{
        if(result.exists){
            this.flashMessage.danger("This Company is already registered",{delay:5000});
        }
    });
}

checkCompanyEmail(){
    this.validateService.checkCompanyEmail(this.company_email).subscribe((result: any)=>{
        if(result.exists){
            this.flashMessage.danger("This Email Already Exists",{delay:5000});
        }
    });
}

}
