import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class LicensesService{
   constructor(private http:Http){}
	// get all Licenses list
	 getAllLicenses(){
		return this.http.get('licenses').map((res)=>{
		return res.json();
		});
	 }
	 // add Licenses
	 addLicenses(formdata) {
	  return this.http
	    .post('licenses', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// edit Licenses
	 editLicense(formdata) {
	  return this.http
	    .post('updateLicenses', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	

 }

