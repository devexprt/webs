import { Component, OnInit } from '@angular/core';
import {FeaturesService} from '../services/features';
import {Features} from '../models/features';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  providers: [FeaturesService, FormBuilder]
})
export class FeaturesComponent implements OnInit { 
features:Features[];
ft_name:string;
id:string;
 form7: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder,private featuresService:FeaturesService) {

  this.form7 = formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.features=[];
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
	
    this.featuresService.getAllPackagesFeatures().subscribe((features)=>{
      this.features=features;
      $("#preloader").hide();
    })

  }
  editModal(id,ft_name){
  this.ft_name = ft_name;
  this.id = id;
  document.getElementById("openEditModal").click();
  }
  updateFeatures(){
    for (let i in this.form7.controls) {
      this.form7.controls[i].markAsTouched();
    }
    if(this.form7.valid){
    $("#preloader").show();
      this.featuresService.editFeatures(this.form7.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form7.reset();
        document.getElementById("editFeatureCloseButton").click();
        this.featuresService.getAllPackagesFeatures().subscribe((features)=>{
      this.features=features;
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
  //delete feature
  public deleteFeature(index, Id) {
    localStorage.setItem('deleteId', Id);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deletePackagesFeatures');
    localStorage.setItem('deleteArray', 'features');
  }
}
