import { Component, OnInit } from '@angular/core';
import {LicensesService} from '../services/license';
import {Licenses} from '../models/license';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-view-license',
  templateUrl: './view-license.component.html',
  styleUrls: ['./view-license.component.scss'],
  providers: [LicensesService, FormBuilder]
})
export class ViewLicenseComponent implements OnInit {
licenses:Licenses[];
form8: FormGroup;
start:string;
id:string;
end:string;
price:string;
  constructor(private licensesService:LicensesService, private formBuilder:FormBuilder,private router: Router) { 
  this.form8 = formBuilder.group({
      id: ['', [Validators.required]],
      start: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.licenses=[];
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
	
  this.licensesService.getAllLicenses().subscribe((licenses)=>{
      this.licenses=licenses;
      $("#preloader").hide();
    })

  }
  editPopup(id,start,end,price){
  this.id = id;
  this.start = start;
  this.end = end;
  this.price = price;
  document.getElementById("openEditModal").click();
  }

  editLicenses(){
    for (let i in this.form8.controls) {
      this.form8.controls[i].markAsTouched();
    }
    if(this.form8.valid){
      $("#preloader").show();
      this.licensesService.editLicense(this.form8.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form8.reset();
        document.getElementById("editLicensesCloseButton").click();
        this.licensesService.getAllLicenses().subscribe((licenses)=>{
          this.licenses=licenses;
        })
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  //delete license
  public deleteLicense(index, Id) {
    localStorage.setItem('deleteId', Id);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteLicense');
    localStorage.setItem('deleteArray', 'licenses');
  }

}
