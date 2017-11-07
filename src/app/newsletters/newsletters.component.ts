import { Component, OnInit } from '@angular/core';
import {NewsLetterService} from '../services/newsletter';
import {NewsLetter} from '../models/newsletter';
import { Router } from '@angular/router';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.scss'],
   providers: [NewsLetterService]
})
export class NewslettersComponent implements OnInit {
newsletters:NewsLetter[];
  constructor(private router: Router, private newsletterService:NewsLetterService) { }

  ngOnInit() {
  if(!localStorage.getItem('currentUserId') || localStorage.getItem('currentUserId')=='' || localStorage.getItem('currentUserId')==null)
  {
    this.router.navigate(['']); 
  }
  $("#preloader").show();
  this.newsletters=[];

    this.newsletterService.getAllNewsLetters().subscribe((newsletters)=>{
      this.newsletters=newsletters;
      $("#preloader").hide();
    })
  }
  //delete NewsLetter
  public deleteNewsLetter(index, NewsLetterId) {
    localStorage.setItem('deleteId', NewsLetterId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteNewsLetter');
    localStorage.setItem('deleteArray', 'newsletters');
  }
  changeStatusPopup(id,status){
  var newStatus = status == '1' ? '0' : '1';
  localStorage.setItem('changeId', id);
  localStorage.setItem('changeStatus', newStatus);
  document.getElementById("openStatusModal").click();
  }

  changeStatus(){
  $("#preloader").show();
  var newsLeterID = localStorage.getItem('changeId');
  var newsLeterStatus = localStorage.getItem('changeStatus');
  this.newsletterService.changeStatusNewsLetter(newsLeterID,newsLeterStatus).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        toastr.success("Success.");
        document.getElementById("changeStatusCloseButton").click();
        this.newsletterService.getAllNewsLetters().subscribe((newsletters)=>{
          this.newsletters=newsletters;
          $("#preloader").hide();
        })
      }
      else
      {
        toastr.error("Error");
        $("#preloader").hide();
      }
      });
  }

}