import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-heading',
  templateUrl: '../elements/sidebar-heading.html',
  //styleUrls: ['./src/styles/elements/sidebar-heading.scss']
})

export class SidebarHeadingComponent implements OnInit {
ufname:string;
ulname:string;
uimage:string;
APIURL:string;
  constructor() {
  }

  ngOnInit(){
  var currentNavbar = localStorage.getItem('currentNavbar');
  this.APIURL = localStorage.getItem('APIURL');
  if(currentNavbar=='adminNav')
  {
  	this.ufname = localStorage.getItem('currentUserFname');
    this.ulname = localStorage.getItem('currentUserLname');
  	this.uimage = localStorage.getItem('currentUserImage');
  }
  else if(currentNavbar=='salesRepNav')
  {
    this.ufname = localStorage.getItem('currentSalesRepFname');
    this.ulname = localStorage.getItem('currentSalesRepLname');
    this.uimage = localStorage.getItem('currentSalesRepImage');
  }
  else if(currentNavbar=='supportNav')
  {
    this.ufname = localStorage.getItem('currentSupportName');
    this.ulname = '';
    this.uimage = localStorage.getItem('currentSupportImage');
  }
  else if(currentNavbar=='supportUserNav')
  {
    this.ufname = localStorage.getItem('currentSupportName');
    this.ulname = '';
    this.uimage = localStorage.getItem('currentSupportImage');
  }
  else if(currentNavbar=='supportAgentNav')
  {
  	this.ufname = localStorage.getItem('currentSupportName');
    this.ulname = '';
  	this.uimage = localStorage.getItem('currentSupportImage');
  }
  }

}
