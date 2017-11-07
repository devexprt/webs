import { Component,OnInit } from '@angular/core';
import {LoginService} from '../services/login';
import {SalesRepService} from '../services/salesrep';
import {Users} from '../models/userslist';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'login',
  templateUrl: '../pages/login.html',
  providers: [FormBuilder, LoginService]
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  output: any;
  submittedForm: any;
  userType: string;

userdata:Users[];

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService:LoginService, private salesrepService:SalesRepService, private route: ActivatedRoute) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userType: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.userType='';
    this.userdata=[];
      var userStatus = this.route.snapshot.params.status;
      var userId = this.route.snapshot.params.userId;
      if(userStatus=='activate' && userId!==undefined)
      {
        this.loginService.updateUserStatus(userId).subscribe((userdata)=>{
          if(userdata.status == '1')
          {
            if(userdata.data.n=='1')
            {
              toastr.success("Congratulations! Your account is activated successfully.","Success!");
              this.router.navigate(['/pages/login']);
            }
            else
            {
              toastr.error("Invalid/Expired link","Sorry!");
              this.router.navigate(['/pages/login']);
            }
          }
          else
          {
            toastr.error("Error, Plz try later.");
            this.router.navigate(['/pages/login']);
          }
        });
      }
  }

  onSubmit(){
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    if(this.form.valid){
    	if(this.form.value.userType=='admin')
      {
        $("#preloader").show();
        $(':input[type="submit"]').prop('disabled', true);
        this.loginService.Login(this.form.value).subscribe((userdata)=>{
          if(userdata.status == '1')
          {
              $("#preloader").hide();
              $(':input[type="submit"]').prop('disabled', false);
              toastr.success("Login Successfully.");
              localStorage.setItem('currentUserId', userdata.data._id);
              localStorage.setItem('currentUserFname', userdata.data.fname);
              localStorage.setItem('currentUserLname', userdata.data.lname);
              localStorage.setItem('currentUserEmail', userdata.data.email);
              localStorage.setItem('currentUserPassword', userdata.data.password);
              localStorage.setItem('currentUserPhone', userdata.data.phone);
              localStorage.setItem('currentUserImage', userdata.data.image);
              localStorage.setItem('currentNavbar', 'adminNav');
              this.router.navigate(['/dashboards/dashboard']);
          }
          else
          {
            $("#preloader").hide();
            $(':input[type="submit"]').prop('disabled', false);
            toastr.error("Invalid Credentials.");
          }
        
        }) 
      }
      else if(this.form.value.userType=='salesrep')
      {
        $("#preloader").show();
        $(':input[type="submit"]').prop('disabled', true);
        this.salesrepService.Login(this.form.value).subscribe((userdata)=>{
          if(userdata.status == '1')
          {
              if(userdata.data.status == '1')
              {
                $("#preloader").hide();
                $(':input[type="submit"]').prop('disabled', false);
                toastr.success("Login Successfully.");
                localStorage.setItem('currentSalesRepId', userdata.data._id);
                localStorage.setItem('currentSalesRepFname', userdata.data.first_name);
                localStorage.setItem('currentSalesRepLname', userdata.data.last_name);
                localStorage.setItem('currentSalesRepEmail', userdata.data.email);
                localStorage.setItem('currentSalesRepPassword', userdata.data.password);
                localStorage.setItem('currentNavbar', 'salesRepNav');
                localStorage.setItem('currentSalesRepImage', '');
                this.router.navigate(['/salesdashboard/salesdashboard']);
              }
              else
              {
                $("#preloader").hide();
                $(':input[type="submit"]').prop('disabled', false);
                toastr.error("Your account is blocked by admin.Please contact admin.");
              }
          }
          else
          {
            $("#preloader").hide();
            $(':input[type="submit"]').prop('disabled', false);
            toastr.error("Invalid Credentials.");
          }
        
        }) 
      }
      else
      {
        toastr.error("Please select user type.");
      }
    }
  }

} 

