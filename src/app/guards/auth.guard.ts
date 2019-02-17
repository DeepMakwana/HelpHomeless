import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessage } from 'angular-flash-message';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private flashMessage: FlashMessage
    ) { }

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.flashMessage.danger("Please log in to continue!", {delay: 3000});
            this.router.navigate(['/login']);
            return false;
        }
    }
}
