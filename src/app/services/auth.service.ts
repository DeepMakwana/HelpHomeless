import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    authToken: any;
    user: any;
    @Output() showLoader: EventEmitter<any> = new EventEmitter();

    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    registerUser(user: any) {
        return this.http.post('http://localhost:3000/users/register', user, {headers: this.headers});
    }

    registerSponsor(sponsor: any) {
        return this.http.post('http://localhost:3000/sponsor/sponsorRegister', sponsor, {headers: this.headers});
    }

    editProfile(user: any) {
        return this.http.post('http://localhost:3000/users/editprofile', user, { headers: this.headers });
    }


    authenticateUser(user: any){
        return this.http.post('http://localhost:3000/users/authenticate', user, {headers: this.headers});
    }

    authenticateSponsor(sponsor: any){
        return this.http.post('http://localhost:3000/sponsor/sponsorAuthenticate', sponsor, {headers: this.headers});
    }

    makeDonation(data: any){
        return this.http.post('http://localhost:3000/donations/makeDonation', data, {headers: this.headers});
    }

    getAddressList(date: any){
        // console.log(date);
        return this.http.post('http://localhost:3000/donations/getAddressList', {date: date}, {headers: this.headers});
    }

    sendOTP(data){
        return this.http.post('http://localhost:3000/services/mobverify', data, { headers: this.headers });
    }

    sendEmail(data){
        return this.http.post('http://localhost:3000/services/emailverify', data, { headers: this.headers });
    }
    // map request
    sendMapReq(locationList){
        return this.http.post('http://localhost:3000/users/drawMap',locationList, { headers: this.headers });
    }
    //map coordinates request
    postCoordinatesRequest(address){
        return this.http.post('http://localhost:3000/users/getCoordinates',{address:address}, { headers: this.headers });
    }

    createCoupon(coupon: any){
        return this.http.post('http://localhost:3000/sponsor/addCoupon',{coupon:coupon}, { headers: this.headers });
    }

    getProfile(){
        this.loadToken();
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', this.authToken);
        return this.http.get('http://localhost:3000/users/profile', {headers: headers});
    }

    storeUserData(token: any, user: any) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    loggedIn(){
        return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}
