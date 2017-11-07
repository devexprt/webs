import {Http,URLSearchParams} from '@angular/http';

import {Injectable} from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
 export class LoginService{
   constructor(private http:Http){}
 
  Login(formdata) {
  return this.http
    .post('loginAdmin', formdata)
      .map((data)=>{
            return data.json();
      }, error => {
         return error.json();
      });
}   
supportLogin(formdata) {
  return this.http
    .post('loginSupport', formdata)
      .map((data)=>{
            return data.json();
      }, error => {
         return error.json();
      });
}  
resetPassword(formdata) {
  return this.http
    .post('resetPassword', formdata)
      .map((data)=>{
            return data.json();
      }, error => {
         return error.json();
      });
}  
setPassword(formdata) {
  return this.http
    .post('setPassword', formdata)
      .map((data)=>{
            return data.json();
      }, error => {
         return error.json();
      });
}  
updateAdmin(formdata) {
  return this.http
    .post('updateAdmin', formdata)
      .map((data)=>{
            return data.json();
      }, error => {
         return error.json();
      });
}  
updateAdminPassword(formdata) {
  return this.http
    .post('updateAdminPassword', formdata)
      .map((data)=>{
            return data.json();
      }, error => {
         return error.json();
      });
}  
// update status to activate
updateUserStatus(userId){ 
let data = new URLSearchParams();
  data.append('userId', userId);
  data.append('status', '1');
return this.http.post('updateUserStatus',data).map((res)=>{
        return res.json();
      }, error => {
        return error.json();
      });
}
// get user from token
checkToken(token){
return this.http.get('checkToken/'+token).map((res)=>{
return res.json();});
}
 }


