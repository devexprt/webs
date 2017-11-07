import {Http,URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
 export class SupportService{
   constructor(private http:Http){}

	// get all agents
	 getAllAgents(){
		return this.http.get('supportAgents').map((res)=>{
		return res.json();
		});
	 }
	 // get all faqs
	 getAllFaqs(){
		return this.http.get('faqs').map((res)=>{
		return res.json();
		});
	 }
	 // get all tickets admin
	 getAllTickets(){
		return this.http.get('tickets').map((res)=>{
		return res.json();
		});
	 }
	 // get all tickets agent
	 getAllAgentTickets(supportId){
		return this.http.get('ticketsAgent/'+supportId).map((res)=>{
		return res.json();
		});
	 }
	 // get all tickets agent
	 getAllUserTickets(supportId){
		return this.http.get('ticketsUser/'+supportId).map((res)=>{
		return res.json();
		});
	 }
	 // get all tickets
	 getTicketsCount(status,supportId){
		return this.http.get('ticketsDash/'+status+'/'+supportId).map((res)=>{
		return res.json();
		});
	 }
	 searchOnlineAgents(){
		return this.http.get('searchOnlineAgents').map((res)=>{
		return res.json();
		});
	 }
	 agentOnlineStatus(agentId,status){
		return this.http.get('agentOnlineStatus/'+agentId+'/'+status).map((res)=>{
		return res.json();
		});
	 }
	 getTicketDetails(ticketId){
		return this.http.get('ticketDetails/'+ticketId).map((res)=>{
		return res.json();
		});
	 }
	 addFaqs(formdata) {
		  return this.http
		    .post('faqs', formdata)
		      .map((res)=>{
		            return res.json();
		      }, error => {
		          return error.json();
		      });
		}
		addChat(formdata) {
		  return this.http
		    .post('addChat', formdata)
		      .map((res)=>{
		            return res.json();
		      }, error => {
		          return error.json();
		      });
		}
	addTickets(formdata,supportId) {
		  return this.http
		    .post('addTickets/'+supportId, formdata)
		      .map((res)=>{
		            return res.json();
		      }, error => {
		          return error.json();
		      });
		}
	changeTicketStatus(ticketid,status) {
		return this.http.get('changeTicketStatus/'+ticketid+'/'+status).map((res)=>{
		return res.json();
		});
	 }
	 allChat(supportId) {
		return this.http.get('allChat/'+supportId).map((res)=>{
		return res.json();
		});
	 }
	 isNewChat(supportId) {
		return this.http.get('isNewChat/'+supportId).map((res)=>{
		return res.json();
		});
	 }
	 changeReadStatus(supportId) {
		return this.http.get('changeReadStatus/'+supportId).map((res)=>{
		return res.json();
		});
	 }
	addTicketComment(comment,ticketid,supportId,supportType,supportName,supportImage) {
		let data = new URLSearchParams();
  		data.append('comment', comment);
  		data.append('supportName', supportName);
  		data.append('supportImage', supportImage);
		  return this.http
		    .post('addTicketComment/'+ticketid+'/'+supportId+'/'+supportType, data)
		      .map((res)=>{
		            return res.json();
		      }, error => {
		          return error.json();
		      });
		}
	addAgent(formdata) {
		  return this.http
		    .post('createSupport', formdata)
		      .map((res)=>{
		            return res.json();
		      }, error => {
		          return error.json();
		      });
		}
	updateAgent(formdata) {
		  return this.http
		    .post('updateAgent', formdata)
		      .map((res)=>{
		            return res.json();
		      }, error => {
		          return error.json();
		      });
		}

 }

