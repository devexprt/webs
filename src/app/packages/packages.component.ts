import { Component, OnInit } from '@angular/core';
import {PackagesService} from '../services/packages';
import {Packages} from '../models/packages';
import {FeaturesService} from '../services/features';
import {Features} from '../models/features';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  providers: [PackagesService, FormBuilder, FeaturesService]
})
export class PackagesComponent implements OnInit {
packages:Packages[];
allfeatures:Features[];
form14: FormGroup;
title:string;
id:string;
price:string;
price1:string;
price2:string;
price3:string;
features:any[];
  constructor(private router: Router, private packagesService:PackagesService, private formBuilder:FormBuilder, private featuresService:FeaturesService) {
  this.form14 = formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      price1: ['', [Validators.required]],
      price2: ['', [Validators.required]],
      price3: ['', [Validators.required]],
      features: []
    })
  }
   

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.packages=[];
  this.allfeatures=[];
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
	
  this.packagesService.getAllPackages().subscribe((packages)=>{
      this.packages=packages;
    })

  this.featuresService.getAllPackagesFeatures().subscribe((allfeatures)=>{
      this.allfeatures=allfeatures;
      $("#preloader").hide();
    })
  }

  editPopup(id,title,price,price1,price2,price3,features){
    this.id = id;
    this.title = title;
    this.price = price;
    this.price1 = price1;
    this.price2 = price2;
    this.price3 = price3;
    var db_features = features.split(',');
    var f;
    $(".no_checked").prop("checked", true);
    for(f=0;f<db_features.length;f++)
    {
      $("#"+db_features[f]).prop("checked", true);
    }
    document.getElementById("openEditModal").click();
  }

  editPackages(){
    for (let i in this.form14.controls) {
      this.form14.controls[i].markAsTouched();
    }
    if(this.form14.valid){
    var checked_features = []; 
      $('.all_checked:checked').each(function(){
         checked_features.push($(this).val());  
      });
      $("#preloader").show();
      this.form14.controls['features'].setValue(checked_features);
      this.packagesService.editPackage(this.form14.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form14.reset();
        document.getElementById("editPackageCloseButton").click();
        this.packagesService.getAllPackages().subscribe((packages)=>{
          this.packages=packages;
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

}
