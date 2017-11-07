import { Component, OnInit } from '@angular/core';
import {PackagesService} from '../services/packages';
import {Packages} from '../models/packages';
import { Router } from '@angular/router';
import {LocationService} from '../services/location';
import {State} from '../models/state';
import {Countries} from '../models/location';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  providers: [PackagesService, LocationService, FormBuilder]
})
export class PricingComponent implements OnInit {
packages:Packages[];
states:State[];
countries:Countries[];
priceVal:string;
form1: FormGroup;
  constructor(private router: Router, private packagesService:PackagesService, private locationService:LocationService, private formBuilder:FormBuilder) { 
    this.form1 = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })

  }

  ngOnInit() {
  this.packages=[];
  this.countries=[];
  this.states=[];
  this.priceVal = 'monthly';
  localStorage.setItem('selectedPackInterval','monthly');
  localStorage.setItem('selectedPackIntervalDay','30');

  this.packagesService.getAllPackages().subscribe((packages)=>{
      this.packages=packages;
    })

  this.locationService.getAllCountries().subscribe((countries)=>{
      this.countries=countries;
    })

    this.locationService.getAllStates().subscribe((states)=>{
      this.states=states;
    })
  }
  selectPack(id,price)
  {
    localStorage.setItem('selectedPackId',id);
  	localStorage.setItem('selectedPackPrice',price);
    localStorage.removeItem('friendInviteEmail')
    localStorage.removeItem('offerSalesLead')
    localStorage.removeItem('offerPackPrice')
    localStorage.removeItem('offerSalesLeadName')
    localStorage.removeItem('offerSalesRepId')
    localStorage.removeItem('offerSalesLeadEmail')
  	this.router.navigate(['/frontindex/signup']);
  }
  addHelp(){
    for (let i in this.form1.controls) {
      this.form1.controls[i].markAsTouched();
    }
    if(this.form1.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.packagesService.addHelp(this.form1.value).subscribe((formdata)=>{
        if(formdata.status == '1')
        {
          toastr.success("Success! Your information has been submitted.");
          this.form1.reset();
          document.getElementById("helpCloseBtn").click();
          $("#preloader").hide();
          $(':input[type="submit"]').prop('disabled', false);
        }
        else
        {
          toastr.error("Error");
          $("#preloader").hide();
          $(':input[type="submit"]').prop('disabled', false);
        }
    
    })
    }
  }
  priceShow(checkedValue,intervalDays){ 
    this.priceVal = checkedValue;
    localStorage.setItem('selectedPackInterval',checkedValue);
    localStorage.setItem('selectedPackIntervalDay',intervalDays);
  }

}
