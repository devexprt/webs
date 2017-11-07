import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoginService} from '../services/login';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
   providers: [FormBuilder, LoginService]
})
export class ProfileSettingsComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;
  output: any;
  submittedForm: any;
  start:string;
  id:string;
  fname:string;
  lname:string;
  email:string;
  password:string;
  phone:string;
  oldpassword:string;
  newpassword:string;
  confirmpassword:string;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService:LoginService) {
    this.form = formBuilder.group({
      id: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], 
      phone: ['', [Validators.required]]
    })

    this.form2 = formBuilder.group({
      id: ['', [Validators.required]],
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]], 
	    confirmpassword: ['', [Validators.required]]
    })
  }
  
  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  this.id = localStorage.getItem('currentUserId');
  this.fname = localStorage.getItem('currentUserFname')
  this.lname = localStorage.getItem('currentUserLname')
  this.email = localStorage.getItem('currentUserEmail');
  this.phone = localStorage.getItem('currentUserPhone');
  this.oldpassword = '';
  this.newpassword = '';
  this.confirmpassword = '';
  }
   updateProfile() {
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    if(this.form.valid){
      this.loginService.updateAdmin(this.form.value).subscribe((userdata)=>{
      if(userdata.status == '1')
      {
          if(userdata.data.n == '1')
          {
            toastr.success("Success.");
            localStorage.setItem('currentUserFname', this.form.value.fname);
            localStorage.setItem('currentUserLname', this.form.value.lname);
            localStorage.setItem('currentUserEmail', this.form.value.email);
            localStorage.setItem('currentUserPhone', this.form.value.phone);
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
  });

}
}
updatePassword() {
    for (let i in this.form2.controls) {
      this.form2.controls[i].markAsTouched();
    }
    if(this.form2.valid){
      var oldpass = localStorage.getItem('currentUserPassword');
      var enterpass = this.form2.value.oldpassword;
      if(oldpass!==enterpass)
      {
        toastr.error("Your old password is wrong.Please enter correct one.");
      }
      else
      {
        this.loginService.updateAdminPassword(this.form2.value).subscribe((userdata)=>{
          if(userdata.status == '1')
          {
              if(userdata.data.n == '1')
              {
                toastr.success("Success.");
                localStorage.setItem('currentUserPassword', this.form2.value.newpassword);
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
      });
      }

}
}
}