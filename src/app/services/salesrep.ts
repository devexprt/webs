import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class SalesRepService{
   constructor(private http:Http){}
    Login(formdata) {
		  return this.http
		    .post('loginSalesRep', formdata)
		      .map((data)=>{
		            return data.json();
		      }, error => {
		         return error.json();
		      });
		} 
   // add salesrep
	 addSalesRep(formdata) {
	  return this.http
	    .post('addSalesRep', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// edit salesrep
	 editSalesRep(formdata) {
	  return this.http
	    .post('updateSalesRep', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// change status salesrep
	 changeStatusSalesRep(id,status) {
	 let data = new URLSearchParams();
	  data.append('id', id);
	  data.append('status', status);
	  return this.http
	    .post('changeStatusSalesRep', data)
	      .map((res)=>{
	            return res.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// get all addSalesRep list
	 getAllSalesRep(){
		return this.http.get('addSalesRep').map((res)=>{
		return res.json();
		});
	 }
	

 }

