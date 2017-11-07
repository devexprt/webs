import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location';
import {Region} from '../models/region';
import {State} from '../models/state';
import {Countries} from '../models/location';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
  providers: [LocationService, FormBuilder]
})
export class RegionsComponent implements OnInit {
states:State[];
countries:Countries[];
regions:Region[];
form11: FormGroup;
region_name:string; 
id:string;
country_id:string;
state_id:string;
  constructor(private locationService:LocationService, private formBuilder:FormBuilder, private router: Router) {
  this.form11 = formBuilder.group({
      id: ['', [Validators.required]],
      region_name: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.regions=[];
  this.countries=[];
  this.states=[];
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    this.locationService.getAllCountries().subscribe((countries)=>{
      this.countries=countries;
    })

    this.locationService.getAllStates().subscribe((states)=>{
      this.states=states;
    })

    this.locationService.getAllRegions().subscribe((regions)=>{
      this.regions=regions;
      $("#preloader").hide();
    })
	
  }
  //delete region
  public deleteRegion(index, RegionId) {
    localStorage.setItem('deleteId', RegionId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteRegion');
    localStorage.setItem('deleteArray', 'regions');
  }
  editPopup(id,region_name,country,state){
  this.id = id;
  this.region_name = region_name;
  this.country_id = country;
  this.state_id = state;
  document.getElementById("openEditModal").click();
  }

  editRegion(){
    for (let i in this.form11.controls) {
      this.form11.controls[i].markAsTouched();
    }
    if(this.form11.valid){
    $("#preloader").show();
      this.locationService.editRegion(this.form11.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form11.reset();
        document.getElementById("editRegionCloseButton").click();
        this.locationService.getAllRegions().subscribe((regions)=>{
          this.regions=regions;
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
