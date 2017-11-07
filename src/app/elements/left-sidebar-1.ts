import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SupportService } from '../services/support';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'left-sidebar-1',
  templateUrl: '../elements/left-sidebar-1.html',
  providers: [NavigationService, SupportService, FormBuilder]
})

export class LeftSidebar1Component implements OnInit {

  navigation: Array<Object>;
  currentnav:string;
  toId:string;
  fromId:string;
  message:string;
  fromName:string;
  form4: FormGroup;
  allChat: any;
  constructor(private navigationService: NavigationService, private route: ActivatedRoute, private router: Router, private supportService: SupportService, private formBuilder: FormBuilder) {
    this.fromName = localStorage.getItem('currentSupportName');
    this.fromId = localStorage.getItem('currentSupportId');
    var SupportType = localStorage.getItem('currentSupportType');
    // if(SupportType == 'user')
    // {
    //   setInterval(() => { this.supportService.searchOnlineAgents().subscribe((onlineAgent)=>{
    //     if(onlineAgent.status == '1')
    //     {
    //       $('#on_off_img').attr("src",'assets/images/start_chat_online.png');
    //       if(localStorage.getItem('toAgentId') =='' || localStorage.getItem('toAgentId')==null || localStorage.getItem('toAgentId')==undefined)
    //       {
    //         localStorage.setItem('toAgentId',onlineAgent.data._id);
    //         this.toId = localStorage.getItem('toAgentId');
    //         $(".chat-history").hide();
    //       }
    //     }
    //     else
    //     {
    //       $('#on_off_img').attr("src",'assets/images/start_chat_offline.png');
    //       localStorage.removeItem('toAgentId');
    //       this.toId = '';
    //       $(".chat-history").show();
    //     }
    //   }); }, 6000);
    // }
    // if(SupportType == 'user' || SupportType == 'admin' || SupportType == 'agent')
    // {
    //   setInterval(() => { 
    //     this.supportService.isNewChat(this.fromId).subscribe((newchat)=>{
    //       if(newchat.data > 0)
    //       {
    //         $('#live-chat-ui').show();       
    //         this.supportService.changeReadStatus(this.fromId).subscribe();  
    //       }
    //     });
    //     this.supportService.allChat(this.fromId).subscribe((allchat)=>{
    //       if(allchat.length > 0)
    //       {
    //           this.allChat = allchat;      
    //       }
    //     });
    //      }, 2000);
    // }
    if(SupportType == 'user')
    {
      this.form4 = formBuilder.group({
        fromId: ['', [Validators.required]],
        toId: ['59d9e07d851f7059dd0235bb', [Validators.required]],
        fromName: ['', [Validators.required]],
        message: ['', [Validators.required]]
      })
    }
    else
    {
      this.form4 = formBuilder.group({
        fromId: ['', [Validators.required]],
        toId: ['59d9e07d851f7059dd0235bb', [Validators.required]],
        fromName: ['', [Validators.required]],
        message: ['', [Validators.required]]
      })
    }
  
  this.currentnav = localStorage.getItem('currentNavbar');
  var currentnav = localStorage.getItem('currentNavbar');
  if(currentnav=='adminNav')
  {
    this.navigation = navigationService.getNavigationAdmin()
  }
  else if(currentnav=='salesRepNav')
  {
    this.navigation = navigationService.getNavigationSalesRep()
  }
  else if(currentnav=='supportNav')
  {
    this.navigation = navigationService.getNavigationSupport()
  }
  else if(currentnav=='supportUserNav')
  {
    this.navigation = navigationService.getNavigationSupportUser()
  }
  else if(currentnav=='supportAgentNav')
  {
    this.navigation = navigationService.getNavigationSupportAgent()
  }
  }

  ngOnInit() {
    $( document ).ready(function() {
      $("#customer_start_chat").click(function(){
        $("#live-chat-ui").show();
      });
      $(".chat-close").click(function(){
        $("#live-chat-ui").hide();
      });
    });

  }
  public supportLoginAdmin()
  {
    localStorage.setItem('currentSupportId', '59d872b71e8a4d2e0cb0d808');
    localStorage.setItem('currentSupportName', localStorage.getItem('currentUserFname')+" "+localStorage.getItem('currentUserLname'));
    localStorage.setItem('currentSupportImage', localStorage.getItem('currentUserImage'));
    localStorage.setItem('currentSupportType', 'admin');
    localStorage.setItem('currentNavbar', 'supportNav');
    this.router.navigate(['/support/dashboard']);
    window.location.reload();
  }
  public adminPanelMain()
  {
    localStorage.setItem('currentUserId', localStorage.getItem('currentUserId'));
    localStorage.setItem('currentUserFname', localStorage.getItem('currentUserFname'));
    localStorage.setItem('currentUserLname', localStorage.getItem('currentUserLname'));
    localStorage.setItem('currentUserEmail', localStorage.getItem('currentUserEmail'));
    localStorage.setItem('currentUserPassword', localStorage.getItem('currentUserPassword'));
    localStorage.setItem('currentUserPhone', localStorage.getItem('currentUserPhone'));
    localStorage.setItem('currentUserImage', localStorage.getItem('currentUserImage'));
    localStorage.setItem('currentNavbar', 'adminNav');
    this.router.navigate(['/dashboards/dashboard']);
    window.location.reload();
  }
  public SupportLoginUser()
  {
    localStorage.setItem('currentSupportId', '59d5c077db4f371ba2eba2cd');
    localStorage.setItem('currentSupportName', '21 user');
    localStorage.setItem('currentSupportImage', '');
    localStorage.setItem('currentSupportType', 'user');
    localStorage.setItem('currentNavbar', 'supportUserNav');
    this.router.navigate(['/support/tickets']);
    window.location.reload();
  }
  addChat(){
    for (let i in this.form4.controls) {
      this.form4.controls[i].markAsTouched();
    }
    if(this.form4.valid){
      this.supportService.addChat(this.form4.value).subscribe((formdata)=>{
          this.message = ''; 
    }) 
    }
  }

}
