import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class LocationService{
   constructor(private http:Http){}
   // add countries
	 addCountry(formdata) {
	  return this.http
	    .post('addCountry', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// edit countries
	 editCountry(formdata) {
	  return this.http
	    .post('updateCountry', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// get all country list
	 getAllCountries(){
		return this.http.get('addCountry').map((res)=>{
		return res.json();
		});
	 }
	 // add states
	 addState(formdata) {
	  return this.http
	    .post('addState', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// edit states
	 editState(formdata) {
	  return this.http
	    .post('updateState', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	}  
	// get all state list
	 getAllStates(){
		return this.http.get('addState').map((res)=>{
		return res.json();
		});
	 }

	 // get all region list
	 getAllRegions(){
		return this.http.get('addRegion').map((res)=>{
		return res.json();
		});
	 }
	 // add regions
	 addRegion(formdata) {
	  return this.http
	    .post('addRegion', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// edit regions
	 editRegion(formdata) {
	  return this.http
	    .post('updateRegion', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	// delete function
		deleteFn(Id,Api){
			let data = new URLSearchParams();
			  data.append('id', Id);
			return this.http.post(Api,data).map((res)=>{
			return res.json();}); 
		}
	

 }

