import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location';
import {Countries} from '../models/location';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [LocationService, FormBuilder]
})
export class CountriesComponent implements OnInit {
countries:Countries[];
CountryId:string;
deleteIndex:string;
form9: FormGroup;
id:string;
name:string;
iso_code_2:string;

  constructor(private router: Router, private locationService:LocationService, private formBuilder:FormBuilder) {
  this.form9 = formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      iso_code_2: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.countries=[];
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

    this.locationService.getAllCountries().subscribe((countries)=>{
      this.countries=countries;
      $("#preloader").hide();
    })
	
  }
  //delete country
  public deleteCountry(index, CountryId) {
    localStorage.setItem('deleteId', CountryId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteCountry');
    localStorage.setItem('deleteArray', 'countries');
  }
  editPopup(id,name,iso_code_2){
    this.id = id;
    this.name = name;
    this.iso_code_2 = iso_code_2;
    document.getElementById("openEditModal").click();
    }

    editCountry(){
    for (let i in this.form9.controls) {
      this.form9.controls[i].markAsTouched();
    }
    if(this.form9.valid){
      $("#preloader").show();
      this.locationService.editCountry(this.form9.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form9.reset();
        document.getElementById("editCountryCloseButton").click();
        this.locationService.getAllCountries().subscribe((countries)=>{
          this.countries=countries;
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