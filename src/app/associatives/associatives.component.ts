import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-associatives',
  templateUrl: './associatives.component.html',
  styleUrls: ['./associatives.component.scss']
})
export class AssociativesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#datatable-example-1').DataTable({
      'ajax': '/assets/json/datatables.json'
    });
    $('#datatable-example-2').DataTable();
  }

}
