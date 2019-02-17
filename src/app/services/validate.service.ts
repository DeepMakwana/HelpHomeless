import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    validateRegister(user: any) {
        if(user.first_name == undefined || user.last_name == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
            return false;
        } else {
              return true;
          }
      }

      validateEmail(email: String) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
      }

      checkUsername(username: String){
            return this.http.post('http://localhost:3000/users/checkUsername', {username: username}, {headers: this.headers});
      }
      checkEmail(email: String){
            return this.http.post('http://localhost:3000/users/checkEmail', {email: email}, {headers: this.headers});
      }

      checkCompanyName(company_name: String){
            return this.http.post('http://localhost:3000/sponsor/checkCompanyName', {company_name: company_name}, {headers: this.headers});
      }
      checkCompanyEmail(company_email: String){
            return this.http.post('http://localhost:3000/sponsor/checkCompanyEmail', {company_email: company_email}, {headers: this.headers});
      }
}
