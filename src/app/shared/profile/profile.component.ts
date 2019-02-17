import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';
import { ValidateService } from '../../services/validate.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    user: any;
    modalReference: any;
    selectedFile = null;
    selectedFileUrl = "../assets/img/placeholder.jpg";
    uploadProgress = 0;
    progressType = "";
    regDate = "";
    mobOTP = "";

    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessage,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    open(modal: any) {
        if (modal._def.references.changeProfilePic) {
            this.selectedFileUrl = "../assets/img/placeholder.jpg";
            this.uploadProgress = 0;
        }
        this.modalReference = this.modalService.open(modal, { size: "lg" });
    }

    openMobileModal(modal: any) {
        this.authService.showLoader.emit(true);
        console.log(this.user.mobNo);
        const data = {
            userId: this.user._id,
            mobNo: this.user.mobNo,
            otp: ''
        }

        this.authService.sendOTP(data).subscribe((otp: any) => {
            if (otp.success) {
                this.authService.showLoader.emit(false);
                this.modalReference = this.modalService.open(modal, { size: "lg" });
            } else {
                this.flashMessage.danger(otp.message, { delay: 5000 });
            }
        });
    }

    openEmailModal(modal: any) {
        this.authService.showLoader.emit(true);
        const data = {
            userId: this.user._id,
            email: this.user.email
        }
        this.authService.sendEmail(data).subscribe((email: any) => {
            if (email.success) {
                this.authService.showLoader.emit(false);
                this.modalReference = this.modalService.open(modal, { size: "lg" });
            } else {
                this.flashMessage.danger(email.message, { delay: 5000 });
            }
        });
    }
}
