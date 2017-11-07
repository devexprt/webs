import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#datatable-example-1').DataTable({
      'ajax': '/assets/json/datatables.json'
    });
    $('#datatable-example-2').DataTable();
  }

}
