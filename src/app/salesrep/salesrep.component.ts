import { Component, OnInit } from '@angular/core';
import {SalesRepService} from '../services/salesrep';
import {SalesRep} from '../models/salesrep';
import {Countries} from 'app/models/location';
import {State} from 'app/models/state';
import { Router } from '@angular/router';
import {Region} from 'app/models/region';
import {LocationService} from 'app/services/location';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-salesrep',
  templateUrl: './salesrep.component.html',
  styleUrls: ['./salesrep.component.scss'],
  providers: [SalesRepService, FormBuilder, LocationService]
})
export class SalesrepComponent implements OnInit {
salesrep:SalesRep[];
form13: FormGroup;
id:string;
first_name:string;
last_name:string;
email:string;
password:string;
confirm_password:string;
address:string;
country:string;
state:string;
region:string;
zip:string;
countries:Countries[];
states:State[];
regions:Region[];

  constructor(private salesrepService:SalesRepService, private formBuilder:FormBuilder, private locationService:LocationService, private router: Router) { 
  this.form13 = formBuilder.group({
      id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      region: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.salesrep=[];
  this.countries=[];
  this.states=[];
  this.regions=[];

    this.locationService.getAllCountries().subscribe((countries)=>{
      this.countries=countries;
    })

    this.locationService.getAllStates().subscribe((states)=>{
      this.states=states;
    })

    this.locationService.getAllRegions().subscribe((regions)=>{
      this.regions=regions;
    })
	$('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

    this.salesrepService.getAllSalesRep().subscribe((salesrep)=>{
      this.salesrep=salesrep;
      $("#preloader").hide();
    })
  }
  //delete SalesRep
  public deleteSalesRep(index, SalesRepId) {
    localStorage.setItem('deleteId', SalesRepId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteSalesRep');
    localStorage.setItem('deleteArray', 'salesrep');
  }
  changeStatusPopup(id,status){
  var newStatus = status == '1' ? '0' : '1';
  localStorage.setItem('changeId', id);
  localStorage.setItem('changeStatus', newStatus);
  document.getElementById("openStatusModal").click();
  }

  changeStatus(){
  var salesID = localStorage.getItem('changeId');
  var saleStatus = localStorage.getItem('changeStatus');
  $("#preloader").show();
  this.salesrepService.changeStatusSalesRep(salesID,saleStatus).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        document.getElementById("changeStatusCloseButton").click();
        this.salesrepService.getAllSalesRep().subscribe((salesrep)=>{
          this.salesrep=salesrep;
        })
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
      });
  }

  editPopup(id,first_name,last_name,email,address,zip,state,country,region,password){
  this.id = id;
  this.first_name = first_name;
  this.last_name = last_name;
  this.email = email;
  this.address = address;
  this.zip = zip;
  this.state = state;
  this.country = country;
  this.region = region;
  this.password = password;
  this.confirm_password = password;
  document.getElementById("openEditModal").click();
  }

  editSalesRep(){
    for (let i in this.form13.controls) {
      this.form13.controls[i].markAsTouched();
    }
    if(this.form13.valid){
      $("#preloader").show();
      this.salesrepService.editSalesRep(this.form13.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form13.reset();
        document.getElementById("editSalesCloseButton").click();
        this.salesrepService.getAllSalesRep().subscribe((salesrep)=>{
          this.salesrep=salesrep;
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
  signInSalesRep(salesId)
  {
    localStorage.setItem('currentSalesRepId', salesId);
    localStorage.setItem('currentNavbar', 'salesRepNav');
    localStorage.setItem('currentSalesRepImage', '');
    window.open('/salesdashboard/salesdashboard', '_blank')
  }
}
