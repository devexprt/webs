import { Component, OnInit } from '@angular/core';
import { SupportService } from '../services/support';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.scss'],
  providers: [SupportService, FormBuilder]
})
export class TicketdetailsComponent implements OnInit {
SupportType:string;
supportId:string;
supportName:string;
supportImage:string;
APIURL:any;
form3: FormGroup;
ticket: any;
  constructor(private supportService: SupportService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
  	this.SupportType = localStorage.getItem('currentSupportType');
  	this.supportId = localStorage.getItem('currentSupportId');
  	this.supportName = localStorage.getItem('currentSupportName');
    this.supportImage = localStorage.getItem('currentSupportImage');
    this.APIURL = localStorage.getItem('APIURL');
  	this.form3 = formBuilder.group({
      comment: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  	if((localStorage.getItem('currentSupportId')=='' || localStorage.getItem('currentSupportId')==null))
	  {
	    this.router.navigate(['/support/login']); 
	  }
	$("#preloader").show();
	var ticketId = this.route.snapshot.params.ticketId;
	this.supportService.getTicketDetails(ticketId).subscribe((ticket)=>{
      this.ticket=ticket;
      $("#preloader").hide();
    })
  }
  addTicketComment(){
    for (let i in this.form3.controls) {
      this.form3.controls[i].markAsTouched();
    }
    if(this.form3.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      var ticketId = this.route.snapshot.params.ticketId;
      var supportName = localStorage.getItem('currentSupportName');
      var supportImage = localStorage.getItem('currentSupportImage');
      this.supportService.addTicketComment(this.form3.value.comment,ticketId,this.supportId,this.SupportType,supportName,supportImage).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        var supportType = localStorage.getItem('currentSupportType');
		var supportId = localStorage.getItem('currentSupportId');
		var ticketId = this.route.snapshot.params.ticketId;
		this.supportService.getTicketDetails(ticketId).subscribe((ticket)=>{
	      this.ticket=ticket;
	      $("#preloader").hide();
	    })
        toastr.success("Submitted.");
        this.form3.reset();
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
      	toastr.success("Ticket has been closed.");
      	this.router.navigate(['/support/tickets']); 
      }
      else
      {
      	$("#preloader").hide();
      	toastr.error("Error, plz try later.");
      }
  });
  }

}
