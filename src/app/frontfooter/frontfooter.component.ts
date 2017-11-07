import { Component, OnInit } from '@angular/core';
import {NewsLetterService} from '../services/newsletter';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-frontfooter',
  templateUrl: './frontfooter.component.html',
  styleUrls: ['./frontfooter.component.scss'],
  providers: [NewsLetterService]
})
export class FrontfooterComponent implements OnInit {
currentNavbar:string;
  constructor(private newsletterService:NewsLetterService) { 
  	this.currentNavbar = localStorage.getItem('currentNavbar');
  }

  ngOnInit() {
  }
  addnewsletter()
  {
  	$("#preloader").show();
  	var newsletter_email = $("#newsletter_email").val();
  	if(newsletter_email=='' || newsletter_email==null)
  	{
  		$("#preloader").hide();
  		toastr.error("Please enter an email address.");
  	}
  	else
  	{
  		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newsletter_email))  
		  {  
		    this.newsletterService.addNewsletter(newsletter_email).subscribe((formdata)=>{
		        if(formdata.status == '1')
		        {
		          toastr.success("You have successfully subscribed to our newsletter. Please check your email to confirm the subscription.");
		          $("#newsletter_email").val('');
		          $("#preloader").hide();
		        }
		        else if(formdata.status == '2')
		        {
		          toastr.info("You have already subscribed to our newsletter.");
		          $("#newsletter_email").val('');
		          $("#preloader").hide();
		        }
		        else
		        {
		          toastr.error("Error");
		          $("#preloader").hide();
		        }
		    })
		  }
		  else
		  {
		  	$("#preloader").hide();
		  	toastr.error("Please enter valid email address.");  
		  }
  	}
  }
}
