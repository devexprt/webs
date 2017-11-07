import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UsersListService} from '../services/userslist';
import {Users} from '../models/userslist';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'user-profile',
  templateUrl: '../pages/user-profile.html',
  providers: [UsersListService]
})

export class UserProfileComponent implements OnInit {

  form: FormGroup;
  output: any;
  submittedForm: any;
  userinfo:Users[];
  licenses:any;
  memberships:any;
  userId:string;
  name:string;
  email:string;
  password:string;
  confirm_password:string;
  phone:string;
  address:string;
  company:string;
  website:string;
  gender:string;
  lang:string;
  facebook:string;
  twitter:string;
  linkdin:string;
  gplus:string;
  image:string;
  APIURL:any;

  constructor(private userslistService:UsersListService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.form = formBuilder.group({
      userId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]], 
      confirm_password: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      company: ['', [Validators.required]],
      website: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    })
  }
  
  ngOnInit() {
  $("#preloader").show();
  this.userinfo=[];
  //let userID: any = this.route.snapshot.params.id;
  this.APIURL = localStorage.getItem('APIURL');
  this.userslistService.viewUser(this.route.snapshot.params.id).subscribe((data)=>{
    this.userinfo = data;
    this.userId = data._id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.confirm_password = data.password;
    this.phone = data.phone;
    this.address = data.address;
    this.company = data.company;
    this.website = data.website;
    this.gender = data.gender;
    this.lang = data.lang;
    this.facebook = data.facebook;
    this.twitter = data.twitter;
    this.linkdin = data.linkdin;
    this.gplus = data.gplus;
    this.image = data.image;
  })

  this.userslistService.getUserLicenses(this.route.snapshot.params.id).subscribe((licenses)=>{
    this.licenses = licenses;
    $("#preloader").hide();
  });

  this.userslistService.getUserMembership(this.route.snapshot.params.id).subscribe((memberships)=>{
    this.memberships = memberships;
  });
  }
   updateUser() {
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    if(this.form.valid){
      this.userslistService.updateUser(this.form.value).subscribe((userinfo)=>{
      if(userinfo.status == '1')
      {
        if(userinfo.data.n == '1')
        {
          toastr.success("Success.");
        }
        else
        {
          toastr.error("Error, please try later.");
        }
      }
      else
      {
        toastr.error("Error, please try later.");
      }
    
    }) 
    }
  }

}