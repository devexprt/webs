import {Http,URLSearchParams} from '@angular/http';

import {Injectable} from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
 export class UsersListService{
   constructor(private http:Http){}
 
 // get all users list
getAllUsers(){
return this.http.get('usersList').map((res)=>{
return res.json();});
}
// get all reg users list
getAllRegUsers(salesRepId){
return this.http.get('regUsersList/'+salesRepId).map((res)=>{
return res.json();});
}

// get graph data 1
graphDataAdmin(){
return this.http.get('graphDataAdmin').map((res)=>{
return res.json();});
}

// get sales lead
getSalesLead(salesId){
return this.http.get('getSalesLead/'+salesId).map((res)=>{
return res.json();});
}

// get user license
getUserLicenses(userId){
return this.http.get('getUserLicenses/'+userId).map((res)=>{
return res.json();});
}

// get user membership
getUserMembership(userId){
return this.http.get('getUserMembership/'+userId).map((res)=>{
return res.json();});
}

// update sales lead status
updateSalesLeadStatus(salesId){
return this.http.get('updateSalesLeadStatus/'+salesId).map((res)=>{
return res.json();});
}

// delete user
deleteUser(userId){
let data = new URLSearchParams();
  data.append('userId', userId);
return this.http.post('deleteUser',data).map((res)=>{
return res.json();}); 
}

// View user
viewUser(userId){
let data = new URLSearchParams();
  data.append('userId', userId);
return this.http.post('viewUser',data).map((res)=>{
return res.json();});
}

// make friends
makeFriends(userId,friendId){
let data = new URLSearchParams();
  data.append('userId', userId);
  data.append('friendId', friendId);
return this.http.post('makeFriends',data).map((res)=>{
        return res.json();
      }, error => {
        return error.json();
      });
}

// check users
checkUser(userEmail){
let data = new URLSearchParams();
  data.append('email', userEmail);
return this.http.post('checkUser',data).map((res)=>{
        return res.json();
      }, error => {
        return error.json();
      });
}

  AddUsers(formdata) {
  return this.http
    .post('addUser', formdata)
      .map((res)=>{
            return res.json();
      }, error => {
          return error.json();
      });
} 

addPayment(formdata,userId) {
  return this.http
    .post('addPayment/'+userId, formdata)
      .map((res)=>{
            return res.json();
      }, error => {
          return error.json();
      });
} 

addLicense(formdata,userId) {
  return this.http
    .post('addLicense/'+userId, formdata)
      .map((res)=>{
            return res.json();
      }, error => {
          return error.json();
      });
} 

PayAuth(formdata) {
  return this.http
    .post('PayAuth', formdata)
      .map((res)=>{
            return res.json();
      }, error => {
          return error.json();
      });
}  
 updateUser(formdata) { 
  return this.http
    .post('updateUser', formdata)
      .map((res)=>{
            return res.json();
      }, error => {
          return error.json();
      });
} 


 }


