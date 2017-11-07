import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NewsLetterService} from '../services/newsletter';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
  providers: [NewsLetterService, FormBuilder]
})
export class ContactusComponent implements OnInit {
form1: FormGroup;
  constructor(private newsletterService:NewsLetterService, private formBuilder:FormBuilder) { 
  this.form1 = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  contactUs(){
    for (let i in this.form1.controls) {
      this.form1.controls[i].markAsTouched();
    }
    if(this.form1.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.newsletterService.contactUs(this.form1.value).subscribe((formdata)=>{
        if(formdata.status == '1')
        {
          $("#preloader").hide();
          $(':input[type="submit"]').prop('disabled', false);
          toastr.success("Your information has been submitted.","Success!");
          this.form1.reset();
        }
        else
        {
          $("#preloader").hide();
          $(':input[type="submit"]').prop('disabled', false);
          toastr.error("Error");
        }
    
    })
    }
  }

}
