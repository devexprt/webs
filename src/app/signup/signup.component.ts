import { Component, OnInit } from '@angular/core';
import {PackagesService} from '../services/packages';
import {Packages} from '../models/packages';
import {LicensesService} from '../services/license';
import {Licenses} from '../models/license';
import {UsersListService} from '../services/userslist';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [PackagesService, LicensesService, FormBuilder, UsersListService]
})
export class SignupComponent implements OnInit {
packages:Packages[];
licenses:Licenses[];
form1: FormGroup;
selectedPackInterval:string;
package_interval:string;
license_count:any;
userId:string;
name:string;
email:string;
edit_package:string;
baseUrl:any;
package_price:string;
sales_rep_id:string;
package_id:string;
final_price:any;
licensesPrice:any;
years:any;
  constructor(private router: Router,private route: ActivatedRoute, private packagesService:PackagesService, private licensesService:LicensesService, private formBuilder:FormBuilder, private userslistService:UsersListService) {

  var current = new Date();
  var currentYear = current.getFullYear();
  var lastYear = currentYear+20;;
  this.years = []; 
  for(let i = currentYear; i < lastYear; i++) { 
    this.years.push(i);
  } 

  if(localStorage.getItem('selectedPackPrice')!=='0')
  {
    this.form1 = formBuilder.group({
      package_id: ['', [Validators.required]],
      package_price: ['', [Validators.required]],
      package_interval: ['', [Validators.required]],
      license_count: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      expiry_month: ['', [Validators.required]],
      expiry_year: ['', [Validators.required]],
      address: ['', [Validators.required]],
      baseUrl: ['', [Validators.required]],
      sales_rep_id: ['', [Validators.required]],
      terms_checkbox: ['', [Validators.required]]
    })
  }
  else
  {
    this.form1 = formBuilder.group({
      package_id: ['', [Validators.required]],
      package_price: ['', [Validators.required]],
      package_interval: ['', [Validators.required]],
      license_count: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      baseUrl: ['', [Validators.required]],
      sales_rep_id: ['', [Validators.required]],
      terms_checkbox: ['', [Validators.required]]
    })
  }

   }

  ngOnInit() {
  this.userId = this.route.snapshot.params.userId;
  this.baseUrl = localStorage.getItem('baseUrl');
  this.sales_rep_id = '0';
  var code = this.route.snapshot.params.code;
  var userId = this.route.snapshot.params.userId;
  var userEmail = this.route.snapshot.params.userEmail;
  
  if(localStorage.getItem('friendInviteEmail')!==null && localStorage.getItem('friendInviteEmail')!=='')
  {
    this.email = localStorage.getItem('friendInviteEmail');
    $( ".emailId" ).prop( "disabled", true );
  }

  this.packages=[];
  this.licenses=[];
  var PackInterval = localStorage.getItem('selectedPackInterval');
  this.selectedPackInterval = localStorage.getItem('selectedPackInterval');
  this.package_interval = localStorage.getItem('selectedPackIntervalDay');
  var packId = localStorage.getItem('selectedPackId');
  //this.package_price = localStorage.getItem('selectedPackPrice');
  this.package_id = packId;
  this.licensesPrice = '0';
  this.license_count = '0';
  if(code=='friends')
  {
    if(userId!==undefined && userEmail!==undefined)
      {
      localStorage.setItem('friendInviteEmail',this.route.snapshot.params.userEmail);
        localStorage.setItem('selectedPackId','59b8eb2c92cdac14c1c71fc8');
        localStorage.setItem('selectedPackPrice','0');
        localStorage.setItem('friendInvite','1');
        localStorage.removeItem('offerSalesLead')
        localStorage.removeItem('offerPackPrice')
        localStorage.removeItem('offerSalesLeadName')
        localStorage.removeItem('offerSalesRepId')
        localStorage.removeItem('offerSalesLeadEmail')
        this.userslistService.checkUser(userEmail).subscribe((formdata)=>{
            if(formdata.status == '1')
            {
              this.userslistService.makeFriends(this.route.snapshot.params.userId,formdata.data._id).subscribe((formdata)=>{
                  if(formdata.status == '1')
                  {
                    toastr.success("Success!");
                    this.form1.reset();
                    this.router.navigate(['/pages/login']);
                  }
                });
            }
            else
            {
              this.router.navigate(['/frontindex/signup']);
            }
        
        });
      }
    }
    else if(code=='offers')
    {
        var salesId = this.route.snapshot.params.userId;
        this.userslistService.getSalesLead(salesId).subscribe((sales)=>{
            if(sales.status=='1') 
            {
              localStorage.removeItem('friendInviteEmail')
              localStorage.setItem('selectedPackId','59b8eb7d92cdac14c1c71fc9');
              localStorage.setItem('selectedPackPrice',sales.data.offer_price);
              localStorage.setItem('offerPackPrice',sales.data.offer_price);
              localStorage.setItem('offerSalesLead',sales.data._id);
              localStorage.setItem('offerSalesLeadName',sales.data.first_name+" "+sales.data.last_name);
              localStorage.setItem('offerSalesLeadEmail',sales.data.email);
              localStorage.setItem('offerSalesRepId',sales.data.sales_rep_id);
              localStorage.removeItem('friendInvite');
              this.router.navigate(['/frontindex/signup']);
            }
            else
            {
              toastr.error("Invalid Url","Sorry!");
              this.router.navigate(['/frontindex/pricing']);
            }
        });
    }


    this.packagesService.getPackDetails(packId).subscribe((packages)=>{
      this.packages=packages;
      if(localStorage.getItem('offerPackPrice')!==null && localStorage.getItem('offerPackPrice')!=='')
      {
        $( ".emailId" ).prop( "disabled", true );
        $( ".nameDis" ).prop( "disabled", true );
        this.package_price = localStorage.getItem('offerPackPrice');
        this.final_price = localStorage.getItem('offerPackPrice');
        this.selectedPackInterval = 'monthly';
        this.package_interval = '30';
        this.edit_package = '0';
        this.name = localStorage.getItem('offerSalesLeadName');
        this.email = localStorage.getItem('offerSalesLeadEmail');
        this.sales_rep_id = localStorage.getItem('offerSalesRepId');
      }
      else
      {
        if(PackInterval=='quarterly')
        {
          this.package_price = packages.price1;
          this.final_price = packages.price1;
        }
        else if(PackInterval=='half-yearly')
        {
          this.package_price = packages.price2;
          this.final_price = packages.price2;
        }
        else if(PackInterval=='yearly')
        {
          this.package_price = packages.price3;
          this.final_price = packages.price3;
        }
        else
        {
          this.package_price = packages.price;
          this.final_price = packages.price;
        }
      }

    })

   this.licensesService.getAllLicenses().subscribe((licenses)=>{
      this.licenses=licenses;
    })
  }
  registerForm(){
    for (let i in this.form1.controls) {
      this.form1.controls[i].markAsTouched();
    }
    if(this.form1.valid){
    var isTrial = localStorage.getItem('selectedPackPrice');
    if(isTrial=='0')
    {
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
        this.userslistService.AddUsers(this.form1.value).subscribe((formdata)=>{
          if(formdata.status == '1')
          {
              var userId = formdata.data._id;
              this.userslistService.addPayment(this.form1.value,userId).subscribe((formdata)=>{
                if(formdata.status == '1')
                {
                  var friendInvite = localStorage.getItem('friendInvite');
                  if(friendInvite=='1')
                  {
                    this.userslistService.makeFriends(this.userId,userId).subscribe((formdata)=>{
                      if(formdata.status == '1')
                      {
                        $("#preloader").hide();
                        $(':input[type="submit"]').prop('disabled', false);
                        toastr.success("You have successfully registered with salvum.", "Congratulations");
                        this.form1.reset();
                        localStorage.removeItem('friendInvite');
                        localStorage.removeItem('friendInviteEmail');
                        this.router.navigate(['/pages/login']);
                      }
                      else
                      {
                        $("#preloader").hide();
                        $(':input[type="submit"]').prop('disabled', false);
                        toastr.error("Error, plz try later.");
                      }
                    });
                  }
                  else
                  {
                    $("#preloader").hide();
                    $(':input[type="submit"]').prop('disabled', false);
                    toastr.success("You have successfully registered with salvum.Please check your email to confirm your account.", "Congratulations");
                    localStorage.removeItem('offerPackPrice');
                    localStorage.removeItem('offerSalesLead');
                    localStorage.removeItem('friendInviteEmail');
                    this.form1.reset();
                    this.router.navigate(['/pages/login']);
                  }
                }
                else
                {
                  $("#preloader").hide();
                  $(':input[type="submit"]').prop('disabled', false);
                  toastr.error("Error, please try later.");
                }
              });

          }
          else if(formdata.status == '2')
          {
            toastr.error("Email already exists!");
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
    else
    {
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.userslistService.checkUser(this.form1.value.email).subscribe((formdata)=>{
          if(formdata.status == '1')
            {
              toastr.error("Email already exists!");
              $("#preloader").hide();
              $(':input[type="submit"]').prop('disabled', false);
            }
            else
            {
              this.userslistService.PayAuth(this.form1.value).subscribe((formdata)=>{
                if(formdata.status == '1')
                {
                  this.userslistService.AddUsers(this.form1.value).subscribe((formdata)=>{
                    if(formdata.status == '1')
                    {
                    var userId = formdata.data._id;
                      this.userslistService.addPayment(this.form1.value,userId).subscribe((formdata)=>{
                        if(formdata.status == '1')
                        {
                          // add license 
                          this.userslistService.addLicense(this.form1.value,userId).subscribe((formdata)=>{
                            if(localStorage.getItem('offerSalesLead')!==null && localStorage.getItem('offerSalesLead')!=='')
                                {
                                  this.userslistService.updateSalesLeadStatus(localStorage.getItem('offerSalesLead')).subscribe((formdata)=>{
                                      return true;
                                });
                                }
                            $("#preloader").hide();
                            $(':input[type="submit"]').prop('disabled', false);
                            toastr.success("Congratulations! you have successfully registered with salvum.Please check your email to confirm your account.", "Transaction success!");
                            localStorage.removeItem('offerSalesLead');
                            localStorage.removeItem('offerPackPrice');
                            localStorage.removeItem('friendInviteEmail');
                            this.form1.reset();
                            this.router.navigate(['/pages/login']);
                          });
                        }
                        else
                        {
                          $("#preloader").hide();
                          $(':input[type="submit"]').prop('disabled', false);
                          toastr.error("Error, please try later.");
                        }
                      });
                    }
                    else
                    {
                      $("#preloader").hide();
                      $(':input[type="submit"]').prop('disabled', false);
                      toastr.error("Error, please try later.");
                    }
                  });
                }
                else
                {
                  $("#preloader").hide();
                  $(':input[type="submit"]').prop('disabled', false);
                  var resError = formdata.error.errorMessage;
                  toastr.error("Error - "+resError, "Transaction failed!");
                }
                });
            }
          });
    }
    }
  }
  onSelectLicense(licenseValue) {
    var licenseVal = licenseValue.split("/");
    var totalLicenses = licenseVal[0];
    this.license_count = licenseVal[0];
    var licensesPrice = licenseVal[1];
    this.licensesPrice = licenseVal[1];
    this.final_price = +this.package_price + +licensesPrice;
  }
}
