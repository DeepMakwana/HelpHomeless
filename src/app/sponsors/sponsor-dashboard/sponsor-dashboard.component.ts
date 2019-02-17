import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-sponsor-dashboard',
  templateUrl: './sponsor-dashboard.component.html',
  styleUrls: ['./sponsor-dashboard.component.scss']
})
export class SponsorDashboardComponent implements OnInit {
    user: any;
    company_name: String;
    discount: String;
    company_id: String;
    coupon_code: String;
    validity: Date;

  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessage) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.company_name = this.user.company_name;

  }
  
  enterCoupon(){
    this.authService.showLoader.emit(true);
    const coupon = {
        id : this.user._id,
        company_name: this.company_name,
        company_id: this.user.company_id,
        coupon_validity: this.validity,
        discount: this.discount,
        coupon_code: this.coupon_code
   }

   this.authService.createCoupon(coupon).subscribe((data: any) => {
    console.log(data);
    if(data.success){
        localStorage.setItem('user', JSON.stringify(this.user));
        this.flashMessage.success("Coupon Uploded Successfully.", {delay: 5000});
        this.router.navigate(['/sponsor-dashboard']);
    } else {
        this.flashMessage.danger("Something went wrong.", {delay: 5000});
        this.router.navigate(['/sponsor-dashboard']);
    }
    this.authService.showLoader.emit(false);
});

}
