import { Component, OnInit } from '@angular/core';
import { SupportService } from '../services/support';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [SupportService, FormBuilder]
})
export class TicketsComponent implements OnInit {
tickets:any;
SupportType:string;
supportId:string;
form4: FormGroup;
  constructor(private supportService: SupportService, private router: Router, private formBuilder: FormBuilder) {
  	this.SupportType = localStorage.getItem('currentSupportType');
  	this.supportId = localStorage.getItem('currentSupportId');
  	this.form4 = formBuilder.group({
      title: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  	if((localStorage.getItem('currentSupportId')=='' || localStorage.getItem('currentSupportId')==null))
	  {
	    this.router.navigate(['/support/login']); 
	  }
	$("#preloader").show();

	var supportType = localStorage.getItem('currentSupportType');
	var supportId = localStorage.getItem('currentSupportId');
	if(supportType == 'admin')
	{
		this.supportService.getAllTickets().subscribe((tickets)=>{
	      this.tickets=tickets;
	      $("#preloader").hide();
	    })
	}
	else if(supportType == 'agent')
	{
		this.supportService.getAllAgentTickets(supportId).subscribe((tickets)=>{
	      this.tickets=tickets;
	      $("#preloader").hide();
	    })
	}
	else if(supportType == 'user')
	{
		this.supportService.getAllUserTickets(supportId).subscribe((tickets)=>{
	      this.tickets=tickets;
	      $("#preloader").hide();
	    })
	}
	else
	{
		this.tickets='';
	    $("#preloader").hide();
	}
    
  }
  addTickets(){
    for (let i in this.form4.controls) {
      this.form4.controls[i].markAsTouched();
    }
    if(this.form4.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.supportService.addTickets(this.form4.value,this.supportId).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        var supportType = localStorage.getItem('currentSupportType');
		var supportId = localStorage.getItem('currentSupportId');
		if(supportType == 'admin')
		{
			this.supportService.getAllTickets().subscribe((tickets)=>{
		      this.tickets=tickets;
		      $("#preloader").hide();
		    })
		}
		else if(supportType == 'agent')
		{
			this.supportService.getAllAgentTickets(supportId).subscribe((tickets)=>{
		      this.tickets=tickets;
		      $("#preloader").hide();
		    })
		}
		else if(supportType == 'user')
		{
			this.supportService.getAllUserTickets(supportId).subscribe((tickets)=>{
		      this.tickets=tickets;
		      $("#preloader").hide();
		    })
		}
        toastr.success("Submitted successfully.");
        this.form4.reset();
        $(':input[type="submit"]').prop('disabled', false);
        document.getElementById("addFaqsCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        $(':input[type="submit"]').prop('disabled', false);
        toastr.error("Error,plz try later.");
      }
    
    }) 
    }
  }
  changeTicketStatus(status,ticketId)
  {
  	$("#preloader").show();
  	this.supportService.changeTicketStatus(ticketId,status).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
      	$("#preloader").hide();
      	toastr.success("Ticket has been re-opened.");
      	this.router.navigate(['/support/ticketdetails/'+ticketId]); 
      }
      else
      {
      	$("#preloader").hide();
      	toastr.error("Error, plz try later.");
      }
  });
  }

}
