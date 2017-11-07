import { Component, OnInit } from '@angular/core';
import {UsersListService} from '../services/userslist';
import {Users} from '../models/userslist';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss'],
  providers: [UsersListService]
})
export class UserslistComponent implements OnInit {

public userForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

users:Users[];
APIURL:any;
addusers:Users[];
userinfo:Users[];
  constructor(private userslistService:UsersListService, public fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  this.APIURL = localStorage.getItem('APIURL');
  this.users=[];
  this.addusers=[];
  this.userinfo=[];
  $("#preloader").show();
    this.userslistService.getAllUsers().subscribe((users)=>{
      this.users=users;
      $("#preloader").hide();
    })
  }

  //View user
  public viewUser(userId) { 
    this.userslistService.viewUser(userId).subscribe((data)=>{
    console.log('view user info');
    this.userinfo = data;
    })
  }

  onSubmit() {
      //console.log(this.userForm.value);
     this.userslistService.AddUsers(this.userForm.value).subscribe((addusers)=>{
    
    //this.addusers=addusers;
    }) 
}
//delete user
  public deleteUser(index, UserId) {
    localStorage.setItem('deleteId', UserId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteUser');
    localStorage.setItem('deleteArray', 'users');
  }
}
