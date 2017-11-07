import { Component, OnInit } from '@angular/core';
import {UsersListService} from '../services/userslist';
import {Users} from '../models/userslist';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-regusers',
  templateUrl: './regusers.component.html',
  styleUrls: ['./regusers.component.scss'],
  providers: [UsersListService]
})
export class RegusersComponent implements OnInit {
users:Users[];

  constructor(private userslistService:UsersListService, private router: Router) { }

  ngOnInit() {
  if((localStorage.getItem('currentUserId')!=='' && localStorage.getItem('currentUserId')!==null) || (localStorage.getItem('currentSalesRepId')!=='' && localStorage.getItem('currentSalesRepId')!==null ))
  { }
  else
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
   this.users=[];
   var salesRepId = '0';
    var currentNavbar = localStorage.getItem('currentNavbar');
    if(currentNavbar=='salesRepNav')
    {
      var salesRepId = localStorage.getItem('currentSalesRepId');
    }
   this.userslistService.getAllRegUsers(salesRepId).subscribe((users)=>{
      this.users=users;
      $("#preloader").hide();
    })
  }

}
