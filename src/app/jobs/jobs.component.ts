import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#datatable-example-1').DataTable({
      'ajax': '/assets/json/datatables.json'
    });
    $('#datatable-example-2').DataTable();
  }

}
