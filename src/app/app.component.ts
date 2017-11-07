import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MousetrapService } from 'app/services/mousetrap';
import { CustomEventsService } from 'app/services/custom-events';
import { Router, NavigationStart } from '@angular/router';
import {LocationService} from 'app/services/location';
import {FeaturesService} from 'app/services/features';
import {SalesRepService} from 'app/services/salesrep';
import {LicensesService} from 'app/services/license';
import {SpacePackagesService} from 'app/services/spacepackages';
import {Countries} from 'app/models/location';
import {State} from 'app/models/state';
import {Region} from 'app/models/region';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualTextValidator } from "angular2-text-equality-validator";

declare var $: any;
declare var _: any;
declare var Storages: any;
declare var fakeLoader: any;
declare var toastr: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MousetrapService, CustomEventsService, FormBuilder, LocationService, SalesRepService, FeaturesService, LicensesService, SpacePackagesService]
})

export class AppComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  form5: FormGroup;
  form6: FormGroup;
  output: any;
  submittedForm: any;
  formdata:Countries[];
  countries:Countries[];
  states:State[];
  regions:Region[];
  deleteId:string;
  deleteIndex:any;
  deleteApi:string;
  deleteArray:string;
  offer1:string;
  showNavbar:string;
  


  public layout: string = 'default-sidebar-1'; //default-sidebar-1,off-canvas-1,sidebar-over-1,off-canvas-1,top-navigation-1,top-navigation-2,empty-view-1
  public background: string = 'light';//light,dark,indigo,blue-grey
  public navbar: string = 'light';//light,dark,indigo,blue-grey
  public sidebar: string = 'dark';//light,dark,indigo,blue-grey
  public topNavigation: string = 'light';//light,dark,indigo,blue-grey
  public logo: string = 'light';//light,dark,indigo,blue-grey
  public collapsed: boolean = false;//true,false
  public controller: string;
  public view: string;
  public currentLocation = '' ;

  constructor(private formBuilder: FormBuilder, private router: Router, private mousetrapService: MousetrapService, private customEventsService: CustomEventsService, private locationService:LocationService, private salesrepService:SalesRepService, private featuresService:FeaturesService, private licensesService:LicensesService, private spacepackagesService:SpacePackagesService) {

  localStorage.setItem('baseUrl','http://localhost:4200');

  this.form = formBuilder.group({
      name: ['', [Validators.required]],
      iso_code_2: ['', [Validators.required]]
    })

    this.form1 = formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      country_id: ['', [Validators.required]]
    })

    this.form2 = formBuilder.group({
      region_name: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]]
    })

    this.form3 = formBuilder.group({
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

    this.form4 = formBuilder.group({
      name: ['', [Validators.required]]
    })

    this.form5 = formBuilder.group({
      start: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })

    this.form6 = formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      data: ['', [Validators.required]],
      price: ['', [Validators.required]],
      offer1: [],
      offer2: []
    })

    this.currentLocation = router.url;
    let config = {
      layout: this.layout,
      background: this.background,
      navbar: this.navbar,
      sidebar: this.sidebar,
      topNavigation: this.topNavigation,
      collapsed: this.collapsed,
      logo: this.logo
    };

    let storage = Storages.localStorage;
    let collapsed = config.collapsed;

    //reset localStorage on page load for demo purposes only. this can be removed in production
    //storage.removeAll();

    if (storage.isEmpty('config') || !(storage.get('config'))) {
      storage.removeAll();
      storage.set('config', config);
    }
    config = storage.get('config');

    //set attributes before page is loaded. this can be removed in production
    $('body').attr('data-background', config.background);
    $('body').attr('data-navbar', config.navbar);
    $('body').attr('data-sidebar', config.sidebar);
    $('body').attr('data-top-navigation', config.topNavigation);
    $('body').attr('data-collapsed', config.collapsed);
    $('body').attr('data-logo', config.logo);

    if ($('html').hasClass('loading')) {
      const loaderTime = 2000;
      $('#fakeloader').fakeLoader({
        timeToHide: loaderTime,
        zIndex: '99999',
        spinner: 'spinner7',
        bgColor: '#263238'
      });
      setTimeout(function() {
        $('html').removeClass('loading');
      }, loaderTime);
    }

    //alternative layouts for some urls
    const demoRedirects = [
      '/demos/default-sidebar',
      '/demos/collapsed-sidebar',
      '/demos/off-canvas',
      '/demos/top-navigation-1',
      '/demos/top-navigation-2',
      '/demos/sidebar-over-layout',
      '/demos/dark-background',
      '/demos/blue-background',
      '/demos/blue-grey-background',
    ];

    const emptyView1 = [
      '/',
      '/pages/error-page',
      '/frontindex/frontindex',
      '/pages/coming-soon',
      '/pages/contact-us',
      '/pages/create-account',
      '/pages/login',
      '/pages/reset-password',
      '/pages/set-password',
      '/pages/subscribe',
      '/pages/under-maintenance',
      '/pages/unlock-account',
      '/frontindex/feature',
      '/frontindex/pricing',
      '/frontindex/signup',
      '/frontindex/signup/:id/:email',
      '/frontindex/blog',
      '/frontindex/aboutus',
      '/frontindex/contact',
      '/support/login',
    ];

    const self = this;

    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {

        const copy = Object.assign({}, val);
        const url = copy.url;

        if (_.includes(emptyView1, url)) {
          self['layout'] = 'empty-view-1';
          $('body').attr('data-background', 'light');
          $('body').attr('data-layout', self['layout']);
        } else {
          self['layout'] = config.layout;
          $('body').attr('data-layout', self['layout']);
        }

        //set data-controller and data-view attributes
        const data = url.split('/').filter(url => url.length > 0);
        let currentController = $('body').attr('data-controller');
        let currentView = $('body').attr('data-view');

        if (_.includes(demoRedirects, url)) {
          console.log('demo redirect', url, data);
          //modify urls to match layouts
          if (data[1] == 'default-sidebar') {
            //default-sidebar-1
            self['layout'] = 'default-sidebar-1';
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else if (data[1] == 'collapsed-sidebar') {
            //collapsed-sidebar-1
            self['layout'] = 'collapsed-sidebar-1';
            config = Object.assign({}, config, {
              layout: 'collapsed-sidebar-1'
            });
          } else if (data[1] == 'top-navigation-1') {
            //top-navigation-1
            self['layout'] = 'top-navigation-1';
            config = Object.assign({}, config, {
              layout: 'top-navigation-1'
            });
            $('body').attr('data-background', 'light');
            $('body').attr('data-navbar', 'dark');
            $('body').attr('data-top-navigation', 'dark');
          } else if (data[1] == 'top-navigation-2') {
            //top-navigation-2
            self['layout'] = 'top-navigation-2';
            config = Object.assign({}, config, {
              layout: 'top-navigation-2'
            });
            $('body').attr('data-background', 'light');
            $('body').attr('data-navbar', 'indigo');
            $('body').attr('data-top-navigation', 'indigo');
          } else if (data[1] == 'off-canvas') {
            //off-canvas-1
            self['layout'] = 'off-canvas-1';
            config = Object.assign({}, config, {
              layout: 'off-canvas-1'
            });
            $('body').attr('data-navbar', 'indigo');
          } else if (data[1] == 'sidebar-over-layout') {
            //sidebar-over-1
            self['layout'] = 'sidebar-over-1';
            config = Object.assign({}, config, {
              layout: 'sidebar-over-1'
            });
          } else if (data[1] == 'dark-background') {
            //dark background
            self['layout'] = 'default-sidebar-1';
            $('body').attr('data-background', 'dark');
            $('body').attr('data-navbar', 'dark');
            $('body').attr('data-top-navigation', 'dark');
            $('body').attr('data-sidebar', 'dark');
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else if (data[1] == 'blue-background') {
            //blue background
            self['layout'] = 'default-sidebar-1';
            $('body').attr('data-background', 'indigo');
            $('body').attr('data-navbar', 'indigo');
            $('body').attr('data-top-navigation', 'indigo');
            $('body').attr('data-sidebar', 'indigo');
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else if (data[1] == 'blue-grey-background') {
            //blue-grey background
            self['layout'] = 'default-sidebar-1';
            $('body').attr('data-background', 'blue-grey');
            $('body').attr('data-navbar', 'blue-grey');
            $('body').attr('data-top-navigation', 'blue-grey');
            $('body').attr('data-sidebar', 'blue-grey');
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else {
            //default redirect
            self['layout'] = 'default-sidebar-1';
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          }
          self['controller'] = 'dashboards';
          self['view'] = 'dashboard';
          $('body').attr('data-controller', 'dashboards');
          $('body').attr('data-view', 'dashboard');
          storage.set('config', config);
          let newUrl = `/dashboards/dashboard`;
          router.navigateByUrl(newUrl);

        } else {

          if (data.length == 1) {
            self['layout'] = data[0];
            $('body').attr('data-layout', data[0]);
            $('body').attr('data-collapsed', false);
            config = Object.assign({}, config, {
              layout: data[0],
              collapsed: false
            });
            storage.set('config', config);
            let newUrl = `/${currentController}/${currentView}`;
            router.navigateByUrl(newUrl);

            //hide backdrop in case previous layout is sidebar-over-1 and state is collapsed
            let backdrop = $('.left-sidebar-backdrop');
            if (backdrop.hasClass('in')) {
              backdrop.removeClass('fade');
              backdrop.removeClass('in');
            }

            //set colors for top navigation layouts. this can be removed in production
            if (data[0] == 'top-navigation-1') {
              $('body').attr('data-background', 'light');
              $('body').attr('data-navbar', 'dark');
              $('body').attr('data-top-navigation', 'dark');
            }
            if (data[0] == 'top-navigation-2') {
              $('body').attr('data-background', 'light');
              $('body').attr('data-navbar', 'indigo');
              $('body').attr('data-top-navigation', 'indigo');
            }
          } else if (data.length == 2) {
            $('body').attr('data-controller', data[0]);
            $('body').attr('data-view', data[1]);
            self['controller'] = data[0];
            self['view'] = data[1];
          } else {
            self['controller'] = 'dashboards';
            self['view'] = 'dashboard';
            $('body').attr('data-controller', 'dashboards');
            $('body').attr('data-view', 'dashboard');
          }
        }

      }
    });

    //mousetrap helpers to control layout settings with the keyboard. this can be removed in production
    mousetrapService.helpers();

    //custom events used to update demo views. this can be removed in production
    customEventsService.helpers();
  }
  ngOnInit() {
    this.showNavbar = localStorage.getItem('currentNavbar');
    this.formdata=[];
    this.countries=[];
    this.states=[];
    this.regions=[];
    this.offer1='';

    this.locationService.getAllCountries().subscribe((countries)=>{
      this.countries=countries;
    })

    this.locationService.getAllStates().subscribe((states)=>{
      this.states=states;
    })

    this.locationService.getAllRegions().subscribe((regions)=>{
      this.regions=regions;
    })
  }
  addCountry(){
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    if(this.form.valid){
      $("#preloader").show();
      this.locationService.addCountry(this.form.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form.reset();
        document.getElementById("addCountryCloseButton").click();
        this.locationService.getAllCountries().subscribe((countries)=>{
          this.countries=countries;
        })
        //this.countriesComponent.getAllCountries();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  addState(){
    for (let i in this.form1.controls) {
      this.form1.controls[i].markAsTouched();
    }
    if(this.form1.valid){
      $("#preloader").show();
      this.locationService.addState(this.form1.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form1.reset();
        document.getElementById("addStateCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  addRegion(){
    for (let i in this.form2.controls) {
      this.form2.controls[i].markAsTouched();
    }
    if(this.form2.valid){
      $("#preloader").show();
      this.locationService.addRegion(this.form2.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form2.reset();
        document.getElementById("addRegionCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  addSalesRep(){
    for (let i in this.form3.controls) {
      this.form3.controls[i].markAsTouched();
    }
    if(this.form3.valid){
      $("#preloader").show();
      this.salesrepService.addSalesRep(this.form3.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form3.reset();
        document.getElementById("addSalesCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  addFeatures(){
    for (let i in this.form4.controls) {
      this.form4.controls[i].markAsTouched();
    }
    if(this.form4.valid){
      $("#preloader").show();
      this.featuresService.addPackagesFeatures(this.form4.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form4.reset();
        document.getElementById("addFeatureCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  addLicenses(){
    for (let i in this.form5.controls) {
      this.form5.controls[i].markAsTouched();
    }
    if(this.form5.valid){
      $("#preloader").show();
      this.licensesService.addLicenses(this.form5.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form5.reset();
        document.getElementById("addLicensesCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  addSpacePackages(){
    for (let i in this.form6.controls) {
      this.form6.controls[i].markAsTouched();
    }
    if(this.form6.valid){
      $("#preloader").show();
      this.spacepackagesService.addSpacePackages(this.form6.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        $("#preloader").hide();
        toastr.success("Success.");
        this.form6.reset();
        document.getElementById("addSpacePacCloseButton").click();
      }
      else
      {
        $("#preloader").hide();
        toastr.error("Error");
      }
    
    }) 
    }
  }
  public confirmDelete() {
  $("#preloader").show();
    this.deleteId = localStorage.getItem('deleteId');
    this.deleteIndex = localStorage.getItem('deleteIndex');
    this.deleteApi = localStorage.getItem('deleteApi');
    this.deleteArray = localStorage.getItem('deleteArray');

    this.locationService.deleteFn(this.deleteId,this.deleteApi).subscribe((countries)=>{
    document.getElementById("removeCloseButton").click();
      toastr.success('Deleted successfully.');
      $("#preloader").hide();
      //this.countries.splice(this.deleteIndex, 1);
    })

    }
    
    

}

