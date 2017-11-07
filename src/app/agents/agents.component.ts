import { Component, OnInit } from '@angular/core';
import { SupportService } from '../services/support';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
  providers: [SupportService, FormBuilder]
})
export class AgentsComponent implements OnInit {
agents:any;
SupportType:string;
user_type:string;
status:string;
form3: FormGroup;
form4: FormGroup;
id:string;
name:string;
email:string;
password:string;
confirm_password:string;
  constructor(private supportService: SupportService, private router: Router, private formBuilder: FormBuilder) {
  	this.SupportType = localStorage.getItem('currentSupportType');
  	this.user_type = 'agent';
  	this.status = '1';
  	this.form3 = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      user_type: ['agent', [Validators.required]],
      status: ['1', [Validators.required]]
    })

    this.form4 = formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  	if((localStorage.getItem('currentSupportId')=='' || localStorage.getItem('currentSupportId')==null))
	  {
	    this.router.navigate(['/support/login']); 
	  }
	$("#preloader").show();
	this.supportService.getAllAgents().subscribe((agents)=>{
      this.agents=agents;
      $("#preloader").hide();
    })
  }
  addAgent(){
    for (let i in this.form3.controls) {
      this.form3.controls[i].markAsTouched();
    }
    if(this.form3.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.supportService.addAgent(this.form3.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        this.supportService.getAllAgents().subscribe((agents)=>{
	      this.agents=agents;
	      $("#preloader").hide();
	    })
        $(':input[type="submit"]').prop('disabled', false);
        toastr.success("Added successfully.");
        this.form3.reset();
        document.getElementById("addAgentCloseButton").click();
      }
      else if(formdata.status == '2')
      {
        $("#preloader").hide();
        $(':input[type="submit"]').prop('disabled', false);
        toastr.error("Agent already exists!");
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
  public deleteAgent(index, AgentId) {
    localStorage.setItem('deleteId', AgentId);
    localStorage.setItem('deleteIndex', index);
    localStorage.setItem('deleteApi', 'deleteAgent');
    localStorage.setItem('deleteArray', 'agents');
  }
  editPopup(id,name,email,status,password){
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.password = password;
    this.confirm_password = password;
    document.getElementById("openEditModal").click();
    }
   editAgent(){
    for (let i in this.form4.controls) {
      this.form4.controls[i].markAsTouched();
    }
    if(this.form4.valid){
      $("#preloader").show();
      $(':input[type="submit"]').prop('disabled', true);
      this.supportService.updateAgent(this.form4.value).subscribe((formdata)=>{
      if(formdata.status == '1')
      {
        this.supportService.getAllAgents().subscribe((agents)=>{
	      this.agents=agents;
	      $("#preloader").hide();
	    })
        $(':input[type="submit"]').prop('disabled', false);
        toastr.success("Updated successfully.");
        document.getElementById("editAgentCloseButton").click();
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

}
