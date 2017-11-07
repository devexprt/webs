import { Component, OnInit } from '@angular/core';
import { SupportService } from '../services/support';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [SupportService, FormBuilder]
})
export class FaqComponent implements OnInit {
faqs:any;
form4: FormGroup;
SupportType:string;
  constructor(private supportService: SupportService, private router: Router, private formBuilder: FormBuilder) {
  	this.SupportType = localStorage.getItem('currentSupportType');

  	this.form4 = formBuilder.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  	if((localStorage.getItem('currentSupportId')=='' || localStorage.getItem('currentSupportId')==null))
	  {
	    this.router.navigate(['/support/login']); 
	  }
	$("#preloader").show();
	function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('sli-arrow-down sli-arrow-up');
	}
	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
	$('.panel-group').on('shown.bs.collapse', toggleIcon);
	this.supportService.getAllFaqs().subscribe((faqs)=>{
      this.faqs=faqs;
      $("#preloader").hide();
    })
  }
  addFaqs(){
    for (let i in this.form4.controls) {
      this.form4.controls[i].markAsTouched();
    }
    if(this.form4.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.supportService.addFaqs(this.form4.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        this.supportService.getAllFaqs().subscribe((faqs)=>{
	      this.faqs=faqs;
	      $("#preloader").hide();
	    })
        toastr.success("Saved successfully.");
        this.form4.reset();
        $(':input[type="submit"]').prop('disabled', false);
        document.getElementById("addFaqsCloseButton").click();
      }
      else if(formdata.status == '2')
      {
        $("#preloader").hide();
        $(':input[type="submit"]').prop('disabled', false);
        toastr.error("Question already exists!");
      }
      else
      {
        $("#preloader").hide();
        $(':input[type="submit"]').prop('disabled', false);
        toastr.error("Error,plz try later.");
      }
    
    }) 
    }
  }
  public deleteFaqs(index, FaqId) {
    localStorage.setItem('deleteId', FaqId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteFaqs');
    localStorage.setItem('deleteArray', 'faqs');
  }

}
