import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class PackagesService{
   constructor(private http:Http){}
	// get all Packages list
	 getAllPackages(){
		return this.http.get('packages').map((res)=>{
		return res.json();
		});
	 }
	// edit Packages
	 editPackage(formdata) {
	  return this.http
	    .post('updatePackages', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// add help
	 addHelp(formdata) {
	  return this.http
	    .post('salesLead', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	getPackDetails(packId){
		let data = new URLSearchParams();
		  data.append('packId', packId);
		return this.http.post('getPackDetails',data).map((res)=>{
		return res.json();});
		}

 }

