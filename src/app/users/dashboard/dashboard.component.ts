import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: any;
    date: any;
    noOfClothes: Number;
    userAddress: String;
    constructor(
        private authService: AuthService,
        private flashMessage: FlashMessage
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        var date = new Date();
        var temp = [];
        this.userAddress = " " + this.user.address1 + " " + this.user.city + " " + this.user.state + " " + this.user.zipCode;
        // console.log(this.userAddress);
        this.authService.postCoordinatesRequest(this.userAddress).subscribe((data:any)=>{
            // console.log(data);
            this.userAddressObj["lat"] = data.coordinates[0].latitude;   //for address latitude
            this.userAddressObj["lng"] = data.coordinates[0].longitude;  //for address longitude
            this.origin = this.userAddressObj;
        });
        var sendDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        if(this.user.isVolunteer) {
            // console.log("Hello");
            this.authService.getAddressList(sendDate).subscribe((data: any) => {

                temp = [this.userAddressObj];
                temp = temp.concat(data.listOfCoordinates);
                temp.push(this.destination);

                // console.log(temp);
                
                this.locationList = temp;
                // console.log(this.locationList);
                
                this.rangeOfDestinations = Array.from(Array(this.locationList.length -1).keys());
            });
        }
        // this.authService.sendMapReq(this.locationList).subscribe((data:any)=>{
        //     console.log(data);
        // });

    // this.authService.postCoordinatesRequest(this.address).subscribe((data:any)=>{
    //   //console.log(data);
    //   this.addressLat = data.coordinates[0].latitude;   //for address latitude
    //   this.addresslng = data.coordinates[0].longitude;  //for address longitude
    //   // console.log(this.addressLat,this.addresslng);
    // });


  // console.log("in components: ");

    // for(let i = 0; i < this.locationList.length-1; i++){
    //   this.locationList[i].dist = 0;
    //   for(let j=i+1; j < this.locationList.length; j++){
    //     let dist = this.getDistance(this.locationList[i], this.locationList[j]);
    //     this.locationList[j].dist = dist*100;
    //     console.log(dist*100, this.locationList[i], this.locationList[j]);
    //     // console.log(this.locationList[3]);
    //     console.log("in 2nd for: ");

    //     console.log(this.locationList);

    //   }

    //   // console.log(i);
    //   // console.log(this.locationList);

    // }
    }

  // address = '28 Pierce Ave Jersey City';

  // addressLat;
  // addresslng;

  locationList = [];
  destination = {"lat":40.733294, "lng": -74.062733};

  latitude : number = this.destination.lat;
  longitude : number  = this.destination.lng;
  userAddressObj = {};


  rangeOfDestinations ;
  origin = null;



    getDistance(start, end) {
        return Math.sqrt(((start.lat - end.lat)*(start.lat - end.lat))+((start.lng - end.lng)*(start.lng - end.lng)));
    }

    onFormSubmit(){
        this.authService.showLoader.emit(true);
        const data = {
            noOfClothes: this.noOfClothes,
            date: this.date.year+'-'+this.date.month+'-'+this.date.day,
            userId: this.user._id,
            address: this.user.address1 + " " + this.user.city + " " + this.user.state + " " + this.user.zipCode,
            latitude: 0,
            longitude: 0
        };
        this.authService.postCoordinatesRequest(data.address).subscribe((coords:any)=>{
           data.latitude = coords.coordinates[0].latitude;   //for address latitude
           data.longitude = coords.coordinates[0].longitude;  //for address longitude

           this.authService.makeDonation(data).subscribe((data: any)=>{
               if(data.success){
                   this.flashMessage.success(data.msg, {delay: 3000});
                   this.date = null;
                   this.noOfClothes = null;
                   this.authService.showLoader.emit(false);
               } else {
                   this.flashMessage.danger(data.msg, {delay: 3000});
                   this.authService.showLoader.emit(false);
               }
           });
        });
    }

}
