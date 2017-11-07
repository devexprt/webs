import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';
import {UsersListService} from '../services/userslist';
import {Users} from '../models/userslist';
import {SalesRepService} from '../services/salesrep';
import {SalesRep} from '../models/salesrep';
import {SalesLeadService} from '../services/saleslead';
import {SalesLead} from '../models/saleslead';
import {PackagesService} from '../services/packages';
import {Packages} from '../models/packages';
import { Router } from '@angular/router';
declare var $: any;
declare var Morris: any;
declare var Datamap: any;
declare var accounting: any;

@Component({
  selector: 'dashboard',
  templateUrl: '../dashboards/dashboard.html',
  providers: [ColorsService, UsersListService, SalesRepService, SalesLeadService, PackagesService]
})

export class DashboardComponent implements OnInit {
users:Users[];
salesrep:SalesRep[];
salesleads:SalesLead[];
packages:Packages[];
paidUsers:any;
graphData1:any;
graphArray:any;
APIURL:any;
  public colors: Object;

  constructor(private colorsService: ColorsService, private userslistService: UsersListService, private salesrepService: SalesRepService, private salesleadService: SalesLeadService, private packagesService:PackagesService, private router: Router) {
    this.colors = colorsService.getBootstrapColors();
  }

  ngOnInit() {
    if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
    {
      this.router.navigate(['']); 
    }
    this.APIURL = localStorage.getItem('APIURL');
    $("#preloader").show();
    
    var start = new Date("2017-09-05");
    var end = new Date("2017-10-07");
    var fullMonthDates = [];
    while(start < end){
       var newDate = start.setDate(start.getDate() + 1);
       var created_date = new Date(newDate);
       var target_date = created_date.getFullYear()+"-"+("0"+(created_date.getMonth()+1)).slice(-2)+"-"+("0"+created_date.getDate()).slice(-2);
       fullMonthDates.push(target_date);
    }

    this.peityBar1('.bar-chart-1', 75, this.colors['success']);
    this.peityBar1('.bar-chart-2', 75, this.colors['danger']);
    this.peityArea1('.area-chart-1', 75, this.colors['warning']);
    this.peityArea1('.area-chart-2', 75, this.colors['info']);
    this.morrisBar('bar-chart-3', this.colors);
    this.morrisLine('line-chart-1', this.colors);
    this.users=[];
    this.salesrep=[];
    this.salesleads=[];
    this.packages=[];

    let self = this;
    let onResizeEnd = () => {
      self.peityBar1('.bar-chart-1', 75, self.colors['success']);
      self.peityBar1('.bar-chart-2', 75, self.colors['danger']);
      self.peityArea1('.area-chart-1', 75, self.colors['warning']);
      self.peityArea1('.area-chart-2', 75, self.colors['info']);
      $('body').trigger('changed:background');
    }

    setInterval(function() {
      var index = Math.floor(Math.random() * 6);
      $('.table-widget-1 tr').each(function(i, v) {
        var td = $('td:nth-child(3)', $(this));
        var value = td.text().trim();
        var random = Math.floor(Math.random() * 1000);
        td.css({ 'font-weight': 500 })
        if (i === index) {
          td.text(random);
          td.css({ 'font-weight': 700 })
        }
      });
      $('.table-widget-1 tr').each(function(i, v) {
        var td = $('td:nth-child(4)', $(this));
        var value = parseInt(td.text().trim());
        var random = Math.floor(Math.random() * 100);
        td.css({ 'font-weight': 500 })
        if (i === index) {
          td.text(random + '%');
          td.css({ 'font-weight': 700 })
        }
      });
    }, 1000);

    setInterval(function() {
      var v1 = Math.floor(Math.random() * 100) + 4200;
      $('#v-1').html(accounting.formatMoney(v1, '', 0, ','));
      $('#v-5').html('(' + (Math.random() * 10).toFixed(1) + '%)');

      var v2 = Math.floor(Math.random() * 1000) + 9500;
      $('#v-2').html(accounting.formatMoney(v2, '$', 0, ','));
      $('#v-6').html('(' + (Math.random() * 10).toFixed(1) + '%)');

      var v3 = Math.floor(Math.random() * 100) + 500;
      $('#v-3').html(accounting.formatMoney(v3, '', 0, ','));
      $('#v-7').html('(' + (Math.random() * 20).toFixed(1) + '%)');

      var v4 = Math.floor(Math.random() * 100) + 900;
      $('#v-4').html(accounting.formatMoney(v4, '', 0, ','));
      $('#v-8').html('(' + (Math.random() * 20).toFixed(1) + '%)');
    }, 1000);

    let resizeTimeout;
    $(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResizeEnd, 500);
    });

    $('body').on('toggle:collapsed', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResizeEnd, 500); 
    })
    // fetch users list
    this.userslistService.getAllUsers().subscribe((users)=>{
      this.users=users;
      var paidUsers = [];
      users.forEach(function(user) {
        if(user.package_price!=='0')
        {
          paidUsers.push(user);
        }
      });
      this.paidUsers = paidUsers;
    })
    // fetch sales rep list
    this.salesrepService.getAllSalesRep().subscribe((salesrep)=>{
      this.salesrep=salesrep;
    })
    // fetch sales lead list
    this.salesleadService.getAllSalesLead('0').subscribe((salesleads)=>{
      this.salesleads=salesleads;
    })
    // fetch packs
    this.packagesService.getAllPackages().subscribe((packages)=>{
      this.packages=packages.length;
      $("#preloader").hide();
    })
    // graph data 1
    var graphArray = [];
    this.userslistService.graphDataAdmin().subscribe((graphData1)=>{
      this.graphData1=graphData1;
      var freeUser = 0;
      var paidUser = 0;
      fullMonthDates.forEach(function(curDate) {
            graphData1.forEach(function(user) {
              var regDate = user.registered_on.split('T');
              var regDate = regDate[0];
              if(curDate==regDate)
              {
                if(user.package_price=='0')
                {
                  freeUser = freeUser + 1;
                }
                else
                {
                  paidUser = paidUser + 1;
                }
                // this.graphArray.push({
                //               y: curDate,
                //               a: freeUser,
                //               b: paidUser
                //             });
                }
              
              
            });
        });
    
         
        
    })

  }
   morrisLine(element: string, colors: any): void {
    const chart = Morris.Line({
      element: element,
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      lineColors: [colors.danger, colors.warning],
      lineWidth: 2
    });
    $(window).resize(function() {
      chart.redraw();
    });

  }   

  peityArea1(element: string, height: number, color: any): void {
    let chart = $(element).peity('line', {
      height: height,
      width: '100%',
      stroke: color,
      fill: color
    });
    setInterval(function() {
      var random = Math.floor(Math.random() * 10) + 2;
      var values = chart.text().split(',');
      values.shift();
      values.push(random);
      chart.text(values.join(',')).change();
    }, 1000);
  }

  peityBar1(element: string, height: number, color: any): void {
    let chart = $(element).peity('bar', {
      height: height,
      width: '100%',
      fill: [color]
    });
    setInterval(function() {
      var random = Math.floor(Math.random() * 10) + 2;
      var values = chart.text().split(',');
      values.shift();
      values.push(random);
      chart.text(values.join(',')).change();
    }, 1000);
  }

  morrisBar(element: string, colors: any): void {
    const chart = Morris.Bar({
      element: element,
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      barColors: [this.colors['info'], this.colors['success']],
    });
    $(window).resize(function() {
      chart.redraw();
    });
  }

  

}
// commented code
// var alldates = [];
      // var counts = [];
      // var index = '0';
      // currentMonth.forEach(function(y){ 
      //   var index = index+1; 
      //   counts.push(0); 
      //   graphData1.forEach(function(x){ 
      //     var regDate = x.registered_on.split('T');
      //     var regDate = regDate[0];
          
      //     if(regDate == y){ 
      //       console.log(regDate+"=="+y+"==yes");
      //       counts[index] = (counts[index] || 0)+1; 
      //     }
      //     else{ 
      //       console.log(regDate+"=="+y+"==no");
      //       if(!counts[index])
      //         { 
      //           counts[index] = 0; 
      //         } 
      //     }
      //   }); 
      //   if(index == 1){ } 
      // });

    //   var currentMonth = [];
    // var days = []; 
    // var month = 10;
    // var year = 2017;
    //   var date = new Date(year, month);
    //       while (date.getMonth() === month) 
    //     { 
    //       var created_date = new Date();
    //       currentMonth.push(created_date.getFullYear()+"-"+("0"+(created_date.getMonth()+1)).slice(-2)+"-"+("0"+created_date.getDate()).slice(-2)); 
    //       days.push(("0"+created_date.getDate()).slice(-2)); 
    //       date.setDate(date.getDate() + 1);
    //     }

    // console.log("====start====");
    //   console.log(counts);
    //   console.log("====end====");



      // graphData1.forEach(function(user) {
      //   var regDate = user.registered_on.split('T');
      //   var regDate = regDate[0];
      //   alldates.push(regDate);
      // });
      // var temp = {};
      // for (var i = 0; i < alldates.length; i++)
      //     temp[alldates[i]] = true;
      // var r = [];
      // for (var k in temp)
      //     r.push(k);


      // {
      //   y: '2006',
      //   a: 100,
      //   b: 90
      // }, {
      //   y: '2007',
      //   a: 75,
      //   b: 65
      // }, {
      //   y: '2008',
      //   a: 50,
      //   b: 40
      // }, {
      //   y: '2009',
      //   a: 75,
      //   b: 65
      // }, {
      //   y: '2010',
      //   a: 50,
      //   b: 40
      // }, {
      //   y: '2011',
      //   a: 75,
      //   b: 65
      // }, {
      //   y: '2012',
      //   a: 100,
      //   b: 90
      // }