import { Component, OnInit } from '@angular/core';
import {SpacePackagesService} from '../services/spacepackages';
import {SpacePackages} from '../models/spacepackages';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-spacepackages',
  templateUrl: './spacepackages.component.html',
  styleUrls: ['./spacepackages.component.scss'],
  providers: [SpacePackagesService, FormBuilder]
})
export class SpacepackagesComponent implements OnInit {
spacepackages:SpacePackages[];
form12: FormGroup;
name:string;
id:string;
type:string;
data:string;
price:string;
offer1:string;
offer2:string;
  constructor(private spacepackagesService:SpacePackagesService,private formBuilder:FormBuilder, private router: Router) {
  this.form12 = formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      data: ['', [Validators.required]],
      price: ['', [Validators.required]],
      offer1: [],
      offer2: []
    })
   }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.spacepackages=[];

    this.spacepackagesService.getAllSpacePackages().subscribe((spacepackages)=>{
      this.spacepackages=spacepackages;
      $("#preloader").hide();
    })
  }

  //delete space packages
  public deleteSpacePackages(index, Id) {
    localStorage.setItem('deleteId', Id);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteSpacePackages');
    localStorage.setItem('deleteArray', 'spacepackages');
  }

  editPopup(id,name,data,type,price,offer){
  this.id = id;
  this.name = name;
  this.type = type;
  this.data = data;
  this.price = price;
  if(offer==null || offer=='')
  {
    this.offer1 = '';
    this.offer2 = '';
  }
  else
  {
  if(offer.includes("$"))
  {
    this.offer1 = '$';
    this.offer2 = offer.substring(1);
  }
  else
  {
    this.offer1 = '%';
    this.offer2 = offer.slice(0,-1);
  }
  }
  document.getElementById("openEditModal").click();
  }

  editSpacePackages(){
    for (let i in this.form12.controls) {
      this.form12.controls[i].markAsTouched();
    }
    if(this.form12.valid){
      $("#preloader").show();
      this.spacepackagesService.editSpacePackages(this.form12.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form12.reset();
        document.getElementById("editSpacePacCloseButton").click();
        this.spacepackagesService.getAllSpacePackages().subscribe((spacepackages)=>{
          this.spacepackages=spacepackages;
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
  changeStatusPopup(id,status){
  var newStatus = status == '1' ? '0' : '1';
  localStorage.setItem('changeId', id);
  localStorage.setItem('changeStatus', newStatus);
  document.getElementById("openStatusModal").click();
  }

  changeStatus(){
  $("#preloader").show();
  var spacePackID = localStorage.getItem('changeId');
  var spacePackStatus = localStorage.getItem('changeStatus');
  this.spacepackagesService.changeStatusSpacePack(spacePackID,spacePackStatus).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        document.getElementById("changeStatusCloseButton").click();
        this.spacepackagesService.getAllSpacePackages().subscribe((spacepackages)=>{
          this.spacepackages=spacepackages;
        })
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
      });
  }

}
