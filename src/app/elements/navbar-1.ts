import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from '../services/support';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'navbar-1',
  templateUrl: '../elements/navbar-1.html',
  styleUrls: [
    '../styles/elements/navbar-1.scss'
  ],
  providers: [SupportService]
})

export class Navbar1Component {
supportId:string;
  constructor(private router: Router, private supportService: SupportService) {
    this.supportId = localStorage.getItem('currentSupportId');
  }

  toggleLayout(): void {
    const body = $('body');
    const collapsed = body.attr('data-collapsed') === 'true' ? true : false;
    body.attr('data-collapsed', !collapsed);
    const layout = body.attr('data-layout');
    if (layout === 'sidebar-over-1') {
      var backdrop = $('.left-sidebar-backdrop');
      if (backdrop.hasClass('in')) {
        backdrop.removeClass('fade');
        backdrop.removeClass('in');
      } else {
        backdrop.toggleClass('fade in');
      }
    }
  }

  toggleRightSidebar(): void {
    $('.right-sidebar-outer').toggleClass('show-from-right');
    if ($('.right-sidebar-outer').hasClass('show-from-right')) {
      $('.right-sidebar-backdrop').toggleClass('fade in');
    } else {
      $('.right-sidebar-backdrop')
        .removeClass('fade')
        .removeClass('in');
    }
  }

  toggleFullscreen(): void {
    console.log('toggleFullscreen');
    const body = $('body');
    const value = body.attr('data-fullscreen') === 'true' ? true : false;
    body.attr('data-fullscreen', !value);
    $(document).fullScreen(!value);
  }

  logOut()
    {
      $("#preloader").show();
      this.supportService.agentOnlineStatus(this.supportId,'0').subscribe((ticket)=>{
        $("#preloader").hide();
        localStorage.clear();
        this.router.navigate(['']);
        });
    }

}

 