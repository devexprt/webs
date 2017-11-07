import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class SalesLeadService{
   constructor(private http:Http){}

	// get all SalesLead list
	 getAllSalesLead(salesRepId){
		return this.http.get('salesLead/'+salesRepId).map((res)=>{
		return res.json();
		});
	 }
	 // get today SalesLead list
	 todaySalesLead(salesRepId){
		return this.http.get('todaySalesLead/'+salesRepId).map((res)=>{
		return res.json();
		});
	 }
	 // get line graph data SalesLead
	 lineGraphSalesLead(salesRepId){
		return this.http.get('lineGraphSalesLead/'+salesRepId).map((res)=>{
		return res.json();
		});
	 }
	 // get SalesLead stats
	 statsSalesLead(salesRepId,status){
		return this.http.get('statsSalesLead/'+salesRepId+'/'+status).map((res)=>{
		return res.json();
		});
	 }
	 // edit saleslead offer price
	 makeOfferSalesRep(formdata) {
	  return this.http
	    .post('makeOfferSalesRep', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 

	// edit saleslead offer price
	 transferSalesRep(formdata) {
	  return this.http
	    .post('transferSalesRep', formdata)
	      .map((data)=>{
	            return data.json();
	      }, error => {
	         return error.json();
	      });
	} 
	

 }

