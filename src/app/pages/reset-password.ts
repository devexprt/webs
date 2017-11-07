import { Component,OnInit } from '@angular/core';
import {LoginService} from '../services/login';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'reset-password',
  templateUrl: '../pages/reset-password.html',
  providers: [FormBuilder, LoginService]
})

export class ResetPasswordComponent implements OnInit {
form: FormGroup;
baseUrl: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private loginService:LoginService, private route: ActivatedRoute) {
	  	this.form = formBuilder.group({
	      email: ['', [Validators.required, Validators.email]],
	      baseUrl: ['', [Validators.required]],
	    })
  }
  ngOnInit() {
  	this.baseUrl = localStorage.getItem('baseUrl');
  }

  resetPassword(){
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    if(this.form.valid){
    	$("#preloader").show();
        $(':input[type="submit"]').prop('disabled', true);
        	this.loginService.resetPassword(this.form.value).subscribe((userdata)=>{
        		$("#preloader").hide();
              	$(':input[type="submit"]').prop('disabled', false);
          		if(userdata.status == '1')
          		{
	      			this.form.reset();
	      			toastr.success("Reset password link sent on your email address.Please check and follow the instructions.","Success");
          		}
          		else if(userdata.status == '2')
          		{
          			toastr.error("Some Technical error.Plz try later","Sorry");
          		}
          		else if(userdata.status == '3')
          		{
          			toastr.error("Error while sending email.plz try later","Sorry");
          		}
          		else if(userdata.status == '0')
          		{
          			toastr.error("Email doesn't exists in our system.","Sorry");
          		}
          	});


    }
}

}

