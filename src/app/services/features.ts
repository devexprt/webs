import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class FeaturesService{
   constructor(private http:Http){}
   // add Features
	 addPackagesFeatures(formdata) {
	  return this.http
	    .post('packagesfeatures', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// edit Features
	 editFeatures(formdata) {
	  return this.http
	    .post('updateFeatures', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// get all packages features list
	 getAllPackagesFeatures(){
		return this.http.get('packagesfeatures').map((res)=>{
		return res.json();
		});
	 }
	

 }

