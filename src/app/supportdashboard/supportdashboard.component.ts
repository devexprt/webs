import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';
import { SupportService } from '../services/support';
import { Router } from '@angular/router';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-supportdashboard',
  templateUrl: './supportdashboard.component.html',
  styleUrls: ['./supportdashboard.component.scss'],
  providers: [ColorsService, SupportService]
})
export class SupportdashboardComponent implements OnInit {
lineGraphData:any;
allagents:any;
SupportId:string;
SupportType:string;
public colors: Object;
openTickets:string;
pendingTickets:string;
closedTickets:string;
  constructor(private colorsService: ColorsService, private supportService: SupportService, private router: Router) {
  	this.colors = colorsService.getBootstrapColors();
    this.SupportType = localStorage.getItem('currentSupportType');
  	this.SupportId = localStorage.getItem('currentSupportId');
  }

  ngOnInit() {
  	if((localStorage.getItem('currentSupportId')=='' || localStorage.getItem('currentSupportId')==null))
	  {
	    this.router.navigate(['/support/login']); 
	  }
	$("#preloader").show();
	this.morrisLine('line-chart-1', this.colors);
  if(this.SupportType == 'admin')
  {
    this.supportService.getTicketsCount('open','0').subscribe((openTickets)=>{
      this.openTickets=openTickets;
    })
    this.supportService.getTicketsCount('pending','0').subscribe((pendingTickets)=>{
      this.pendingTickets=pendingTickets;
    })
    this.supportService.getTicketsCount('closed','0').subscribe((closedTickets)=>{
      this.closedTickets=closedTickets;
    })
  }
  else 
  {
    this.supportService.getTicketsCount('open',this.SupportId).subscribe((openTickets)=>{
      this.openTickets=openTickets;
    })
    this.supportService.getTicketsCount('pending',this.SupportId).subscribe((pendingTickets)=>{
      this.pendingTickets=pendingTickets;
    })
    this.supportService.getTicketsCount('closed',this.SupportId).subscribe((closedTickets)=>{
      this.closedTickets=closedTickets;
    })
  }

	this.supportService.getAllAgents().subscribe((agents)=>{
      this.allagents=agents;
      $("#preloader").hide();
    })
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
      labels: ['Total tickets', 'Closed tickets'],
      lineColors: [colors.danger, colors.warning],
      lineWidth: 2
    });
    $(window).resize(function() {
      chart.redraw();
    });

  }

}
