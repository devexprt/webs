import { Component,OnInit } from '@angular/core';
import {LoginService} from '../services/login';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers : [LoginService, FormBuilder]
})
export class SupportComponent implements OnInit {
form: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private loginService:LoginService, private route: ActivatedRoute) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }
  onSubmit(){
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    if(this.form.valid){
    	$("#preloader").show();
        $(':input[type="submit"]').prop('disabled', true);
        this.loginService.supportLogin(this.form.value).subscribe((userdata)=>{
          if(userdata.status == '1')
          {
              if(userdata.data.status=='1')
              {
              	  $("#preloader").hide();
	              $(':input[type="submit"]').prop('disabled', false);
	              toastr.success("Login Successfully.");
	              localStorage.setItem('currentSupportId', userdata.data._id);
	              localStorage.setItem('currentSupportName', userdata.data.name);
	              localStorage.setItem('currentSupportImage', '');
	              localStorage.setItem('currentSupportType', userdata.data.user_type);
	              localStorage.setItem('currentNavbar', 'supportAgentNav');
	              this.router.navigate(['/support/dashboard']);
              }
              else
              {
              	  $("#preloader").hide();
	              $(':input[type="submit"]').prop('disabled', false);
	              toastr.info("Your account is deactivated.Please contact support admin.");
              }
          }
          else
          {
            $("#preloader").hide();
            $(':input[type="submit"]').prop('disabled', false);
            toastr.error("Invalid Credentials.","Oops!");
          }
        
        });
    }
  }
}
