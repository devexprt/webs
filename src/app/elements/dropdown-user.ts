import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from '../services/support';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'dropdown-user',
  templateUrl: '../elements/dropdown-user.html',
  styleUrls: [
    '../styles/elements/dropdown-user.scss'
  ],
  providers: [SupportService]
})

export class DropdownUserComponent {
currentnav:string;
supportId:string;
APIURL:string;
uimage:string;
  constructor(private router: Router, private supportService: SupportService) {
  this.supportId = localStorage.getItem('currentSupportId');
  this.currentnav = localStorage.getItem('currentNavbar');
  this.APIURL = localStorage.getItem('APIURL');

  if(localStorage.getItem('currentNavbar')=='adminNav')
  {
    this.uimage = localStorage.getItem('currentUserImage');
  }
  else if(localStorage.getItem('currentNavbar')=='salesRepNav')
  {
    this.uimage = localStorage.getItem('currentSalesRepImage');
  }
  else if(localStorage.getItem('currentNavbar')=='supportNav')
  {
    this.uimage = localStorage.getItem('currentSupportImage');
  }
  else if(localStorage.getItem('currentNavbar')=='supportUserNav')
  {
    this.uimage = localStorage.getItem('currentSupportImage');
  }
  else if(localStorage.getItem('currentNavbar')=='supportAgentNav')
  {
    this.uimage = localStorage.getItem('currentSupportImage');
  }
  }

  logOut()
    {
      $("#preloader").show();
      this.supportService.agentOnlineStatus(this.supportId,'0').subscribe((ticket)=>{
        $("#preloader").hide();
        localStorage.clear();
        this.router.navigate(['']);
        });
    }
}