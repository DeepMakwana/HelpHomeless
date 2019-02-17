import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    test : Date = new Date();

    first_name: String;
    last_name: String;
    username: String;
    password: String;
    email: String;
    isVolunteer: Boolean;

    constructor(
        private validateService: ValidateService,
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessage
    ) { }

    ngOnInit() {
    }

    onRegisterSubmit() {
        this.authService.showLoader.emit(true); // Show loader before operation

        const user = {
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            email: this.email,
            password: this.password,
            isVolunteer: this.isVolunteer,
            isAdmin: false
        }

        // Required Fields
        if(!this.validateService.validateRegister(user)) {
            this.flashMessage.danger("Please fill in all the details", {delay: 3000});
            return false;
        }

        // Validare Email
        if(!this.validateService.validateEmail(user.email)) {
            this.flashMessage.danger("Please enter a valid email", {delay: 3000});
            return false;
        }

        // Register User
        this.authService.registerUser(user).subscribe((data: any) => {
            if(data.success) {
                this.flashMessage.success("Registration Completed! Please Log In.", {delay: 3000});
                this.router.navigate(['/login']);
            } else {
                this.flashMessage.danger("Something Went Wrong!", {delay: 3000});
                this.router.navigate(['/register']);
            }
        });
        this.authService.showLoader.emit(false); // Hide loader after operation
    }

        // Check User
    checkUsername(){
        this.validateService.checkUsername(this.username).subscribe((result: any)=>{
            if(result.exists){
                this.flashMessage.danger("This Username Already Exists",{delay:5000});
            }
        });
    }

    checkEmail(){
        console.log(this.email);
        this.validateService.checkEmail(this.email).subscribe((result: any)=>{
            console.log(result);
            if(result.exists){
                this.flashMessage.danger("This Email Already Exists",{delay:5000});
            }
        });
    }

}
