import { Component, OnInit } from '@angular/core';
import {SalesLeadService} from '../services/saleslead';
import {SalesLead} from '../models/saleslead';
import {SalesRepService} from '../services/salesrep';
import {SalesRep} from '../models/salesrep';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-saleslead',
  templateUrl: './saleslead.component.html',
  styleUrls: ['./saleslead.component.scss'],
  providers: [SalesLeadService, FormBuilder, SalesRepService]
})
export class SalesleadComponent implements OnInit {
salesleads:SalesLead[];
salesrep:SalesRep[];
currentNav:string;
cbChecked: string[];
id:string;
email:string;
name:string;
baseUrl:any;
ids:any;
selectedAll: any;
form1: FormGroup;
form3: FormGroup;
  constructor(private salesleadService:SalesLeadService, private router: Router, private formBuilder:FormBuilder, private salesrepService:SalesRepService) { 
  this.form1 = formBuilder.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      baseUrl: ['', [Validators.required]],
      offer_price: ['', [Validators.required]]
    })

    this.form3 = formBuilder.group({
      ids: ['', [Validators.required]],
      sales_rep_id: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  if((localStorage.getItem('currentUserId')!=='' && localStorage.getItem('currentUserId')!==null) || (localStorage.getItem('currentSalesRepId')!=='' && localStorage.getItem('currentSalesRepId')!==null ))
  { }
  else
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.salesleads=[];
  this.salesrep=[];

    var salesRepId = '0';
    var currentNavbar = localStorage.getItem('currentNavbar');
    this.currentNav = localStorage.getItem('currentNavbar');
    if(currentNavbar=='salesRepNav')
    {
      var salesRepId = localStorage.getItem('currentSalesRepId');
    }
    this.salesleadService.getAllSalesLead(salesRepId).subscribe((salesleads)=>{
      this.salesleads=salesleads;
    })

    this.salesrepService.getAllSalesRep().subscribe((salesrep)=>{
      this.salesrep=salesrep;
      $("#preloader").hide();
    })

  }

  makeOfferPopup(id,email,name){
  this.id = id;
  this.email = email;
  this.name = name;
  this.baseUrl = localStorage.getItem('baseUrl');
  document.getElementById("openOfferModal").click();
  }
  makeOffer(){
  for (let i in this.form1.controls) {
      this.form1.controls[i].markAsTouched();
    }
    if(this.form1.valid){
    $("#preloader").show();
      this.salesleadService.makeOfferSalesRep(this.form1.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        toastr.success("Success.");
        this.form1.reset();
        document.getElementById("makeOfferCloseButton").click();
        var salesRepId = '0';
        var currentNavbar = localStorage.getItem('currentNavbar');
        if(currentNavbar=='salesRepNav')
        {
          var salesRepId = localStorage.getItem('currentSalesRepId');
        }
        this.salesleadService.getAllSalesLead(salesRepId).subscribe((salesleads)=>{
          this.salesleads=salesleads;
          $("#preloader").hide();
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
  selectAll() {  
    for (var i = 0; i < this.salesleads.length; i++) {
      this.salesleads[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected(chBox, cbIdx, event) {
    this.selectedAll = this.salesleads.every(function(item:any) {
        return item.selected == true;
      })

  
  }
  transferPopup()
  {
  var checkboxValues = [];
    $('.all_checkboxes:checked').each(function() {
      checkboxValues.push(this.value);
    });
    if(checkboxValues.length==0)
    {
      toastr.error("Please select atleast one checkbox to proceed.");
    }
    else
    {
      this.ids = checkboxValues;
      document.getElementById("openTransferModal").click();
    }
  }
  transferToAnother(){
  for (let i in this.form3.controls) {
      this.form3.controls[i].markAsTouched();
    }
    if(this.form3.valid){
      $("#preloader").show();
      this.salesleadService.transferSalesRep(this.form3.value).subscribe((formdata)=>{
        toastr.success("Transfered Successfully.");
        this.form3.reset();
        document.getElementById("transferCloseButton").click();
        var SID = '0';
        this.salesleadService.getAllSalesLead(SID).subscribe((salesleads)=>{
          this.salesleads=salesleads;
          $("#preloader").hide();
        })
    
    }) 
    }
  }

}
