import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';
import { Router } from '@angular/router';
import {SalesLeadService} from '../services/saleslead';
import {SalesLead} from '../models/saleslead';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-salesdashboard',
  templateUrl: './salesdashboard.component.html',
  styleUrls: ['./salesdashboard.component.scss'],
  providers: [SalesLeadService, ColorsService]
})
export class SalesdashboardComponent implements OnInit {
salesleads:SalesLead[];
pendingSales:any;
convertedSales:any;
todaySales:any;
lineGraphData:any;
public colors: Object;
  constructor(private colorsService: ColorsService, private router: Router, private salesleadService:SalesLeadService) {
  this.colors = colorsService.getBootstrapColors();
   }

  ngOnInit() {
  if((localStorage.getItem('currentUserId')!=='' && localStorage.getItem('currentUserId')!==null) || (localStorage.getItem('currentSalesRepId')!=='' && localStorage.getItem('currentSalesRepId')!==null ))
  { }
  else
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.morrisLine('line-chart-1', this.colors);
  this.salesleads=[];
    var salesRepId = '0';
    var salesRepId = localStorage.getItem('currentSalesRepId');
    this.salesleadService.getAllSalesLead(salesRepId).subscribe((salesleads)=>{
        this.salesleads=salesleads;
    })
    var pending = '1';
    var converted = '2';
    this.salesleadService.statsSalesLead(salesRepId,pending).subscribe((salesleads)=>{
        this.pendingSales=salesleads;
    })
    this.salesleadService.statsSalesLead(salesRepId,converted).subscribe((salesleads)=>{
        this.convertedSales=salesleads;
    })
    this.salesleadService.todaySalesLead(salesRepId).subscribe((salesleads)=>{
        this.todaySales=salesleads;
        $("#preloader").hide();
    })
    // line graph data
    //this.salesleadService.lineGraphSalesLead(salesRepId).subscribe((salesleads)=>{
       // this.lineGraphData=salesleads;
    //})
  }

  morrisLine(element: string, colors: any): void {
    const chart = Morris.Line({
      element: element,
      data: [{
        m: '2006',
        a: 100,
        b: 90
      }, {
        m: '2007',
        a: 75,
        b: 65
      }, {
        m: '2008',
        a: 50,
        b: 40
      }, {
        m: '2009',
        a: 75,
        b: 65
      }, {
        m: '2010',
        a: 50,
        b: 40
      }, {
        m: '2011',
        a: 75,
        b: 65
      }, {
        m: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'm',
      ykeys: ['a', 'b'],
      labels: ['Total leads', 'Converted leads'],
      lineColors: [colors.danger, colors.warning],
      lineWidth: 2
    });
    $(window).resize(function() {
      chart.redraw();
    });

  }

}
