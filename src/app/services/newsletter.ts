import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class NewsLetterService{
   constructor(private http:Http){} 
	// get all NewsLetter list
	 getAllNewsLetters(){
		return this.http.get('newsLetter').map((res)=>{
		return res.json();
		});
	 }
	 // change status newsletter
	 changeStatusNewsLetter(id,status) {
	 let data = new URLSearchParams();
	  data.append('id', id);
	  data.append('status', status);
	  return this.http
	    .post('changeStatusNewsLetter', data)
	      .map((res)=>{
	            return res.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// add contact us 
	 contactUs(formdata) {
	  return this.http
	    .post('contactUs', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// add newsletter 
	 addNewsletter(email) {
	 let data = new URLSearchParams();
	  data.append('email', email);
	  return this.http
	    .post('newsLetter', data)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 

 }

