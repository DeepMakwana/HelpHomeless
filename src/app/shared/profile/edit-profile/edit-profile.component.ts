import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    user: any;
    first_name: String;
    last_name: String;
    gender: String;
    email: String;
    mobileNo: Number;
    username: String;
    age: Number;
    address1: String;
    address2: String;
    city: String;
    state: String;
    zipCode: Number;
    country: String = "USA";

    selectedFile = null;
    fileCheck: Boolean = false;
    default = "../assets/img/image_placeholder.jpg";
    selectedFileUrl = this.default;

    constructor(
        private validateService: ValidateService,
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessage
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.first_name = this.user.first_name;
        this.last_name = this.user.last_name;
        this.email = this.user.email;
        this.gender = this.user.gender;
        this.mobileNo = this.user.mobileNo;
        this.username = this.user.username;
        this.age = this.user.age;
        this.address1 = this.user.address1;
        this.address2 = this.user.address2;
        this.city = this.user.city;
        this.state = this.user.state;
        this.zipCode = this.user.zipCode;
    }

    onSave() {
        this.authService.showLoader.emit(true);
        const user = {
            id : this.user._id,
            first_name: this.first_name,
            last_name: this.last_name,
            gender: this.gender,
            email: this.email,
            mobileNo: this.mobileNo,
            username: this.username,
            age: this.age,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            zipCode: this.zipCode,
            country: this.country
        };
        console.log(user);
        // Validare Email
        if(!this.validateService.validateEmail(user.email)) {
            this.flashMessage.danger("Please enter a valid email", {delay: 3000});
            return false;
        }

        this.authService.editProfile(user).subscribe((data: any) => {
            console.log(data);
            if(data.success){
                this.user = data.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.flashMessage.success("Profile Updated Successfully.", {delay: 5000});
                this.router.navigate(['/profile']);
            } else {
                this.flashMessage.danger("Something went wrong.", {delay: 5000});
                this.router.navigate(['/profile']);
            }
            this.authService.showLoader.emit(false);
        });
        console.log(this.first_name, this.last_name, this.gender, this.email, this.mobileNo, this.username, this.age, this.address1, this.address2, this.city, this.state, this.zipCode, this.country);
    }
}
