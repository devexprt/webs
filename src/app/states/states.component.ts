import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location';
import {State} from '../models/state';
import {Countries} from '../models/location';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss'],
  providers: [LocationService, FormBuilder]
})
export class StatesComponent implements OnInit {
states:State[];
countries:Countries[];
form10: FormGroup;
id:string;
name:string;
code:string;
country_id:string;
  constructor(private locationService:LocationService, private formBuilder:FormBuilder, private router: Router) {

  this.form10 = formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      country_id: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.states=[];
  this.countries=[];
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

	this.locationService.getAllStates().subscribe((states)=>{
      this.states=states;
    })

  this.locationService.getAllCountries().subscribe((countries)=>{
      this.countries=countries;
      $("#preloader").hide();
    })
  }
  //delete state
  public deleteState(index, StateId) {
    localStorage.setItem('deleteId', StateId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteState');
    localStorage.setItem('deleteArray', 'states');
  }

  editPopup(id,name,code,country_id){
  this.id = id;
  this.name = name;
  this.code = code;
  this.country_id = country_id;
  document.getElementById("openEditModal").click();
  }

  editState(){
    for (let i in this.form10.controls) {
      this.form10.controls[i].markAsTouched();
    }
    if(this.form10.valid){
      $("#preloader").show();
      this.locationService.editState(this.form10.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form10.reset();
        document.getElementById("editStateCloseButton").click();
        this.locationService.getAllStates().subscribe((states)=>{
          this.states=states;
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
