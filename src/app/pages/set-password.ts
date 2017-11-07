import { Component,OnInit } from '@angular/core';
import {LoginService} from '../services/login';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
declare var Rtoken: any;

@Component({
  selector: 'set-password',
  templateUrl: '../pages/set-password.html',
  providers: [FormBuilder, LoginService]
})

export class SetPasswordComponent implements OnInit {
form2: FormGroup;
id: string;
  constructor(private router: Router, private formBuilder: FormBuilder, private loginService:LoginService, private route: ActivatedRoute) {
	  	this.form2 = formBuilder.group({
      id: ['', [Validators.required]],
      newpassword: ['', [Validators.required]], 
      confirmpassword: ['', [Validators.required]]
    })
  }
  ngOnInit() {
    var code = this.route.snapshot.params.code;
    var Rtoken = this.route.snapshot.params.token;
    if(code=='reset' && Rtoken!==undefined)
    {
      localStorage.setItem('resetToken', Rtoken);
      this.router.navigate(['/pages/set-password']);
    }
     if(localStorage.getItem('resetToken')=='' || localStorage.getItem('resetToken')==null)
     {
        toastr.error("Invalid Link","Oops!");
        this.router.navigate(['/pages/login']);
     }
     else
     {
        this.loginService.checkToken(localStorage.getItem('resetToken')).subscribe((userdata)=>{
          if(userdata.status=='1')
          {
            this.id = userdata.data._id;
          }
          else
          {
            toastr.error("Invalid Link.Plz try later.","Oops!");
            this.router.navigate(['/pages/login']);
          }


        });
     }

     
  }

  setPassword(){
    for (let i in this.form2.controls) {
      this.form2.controls[i].markAsTouched();
    }
    if(this.form2.valid){
    	$("#preloader").show();
        $(':input[type="submit"]').prop('disabled', true);
        	this.loginService.setPassword(this.form2.value).subscribe((userdata)=>{
        		$("#preloader").hide();
              	$(':input[type="submit"]').prop('disabled', false);
          		if(userdata.status == '1')
          		{
	      			this.form2.reset();
	      			toastr.success("Your password has been updated.","Success");
              localStorage.removeItem('resetToken');
              this.router.navigate(['/pages/login']);
          		}
          		else 
          		{
          			toastr.error("Error.Plz try later","Sorry");
          		}
          	});


    }
}

}

