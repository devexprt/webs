import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class SpacePackagesService{
   constructor(private http:Http){}
	// get all Space Packages list
	 getAllSpacePackages(){
		return this.http.get('SpacePackages').map((res)=>{
		return res.json();
		});
	 }
	 // add Space Packages
	 addSpacePackages(formdata) {
	  return this.http
	    .post('SpacePackages', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}
	// edit Space Packages
	 editSpacePackages(formdata) {
	  return this.http
	    .post('updateSpacePackages', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}
	 // change status space pack
	 changeStatusSpacePack(id,status) {
	 let data = new URLSearchParams();
	  data.append('id', id);
	  data.append('status', status);
	  return this.http
	    .post('changeStatusSpacePackages', data)
	      .map((res)=>{
	            return res.json();
	      }, error => {
	         return error.json();
	      });
	} 
	

 }

