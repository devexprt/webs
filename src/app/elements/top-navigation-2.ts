import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation';

@Component({
  selector: 'top-navigation-2',
  templateUrl: '../elements/top-navigation-2.html',
  providers: [NavigationService]
})

export class TopNavigation2Component implements OnInit {

  navigation: Array<Object>;
  topNavigation: Array<Object>;
  numbers: Array<number>;

  constructor(private navigationService: NavigationService) {
    var self = this;
    self.topNavigation = [];
    
    var currentnav = localStorage.getItem('currentNavbar');
    if(currentnav=='adminNav')
    {
      self.navigation = navigationService.getNavigationAdmin()
    }
    else if(currentnav=='salesRepNav')
    {
      self.navigation = navigationService.getNavigationSalesRep()
    }
    else if(currentnav=='supportNav')
    {
      self.navigation = navigationService.getNavigationSupport()
    }
    else if(currentnav=='supportUserNav')
    {
      self.navigation = navigationService.getNavigationSupportUser()
    }
    else if(currentnav=='supportAgentNav')
    {
      self.navigation = navigationService.getNavigationSupportAgent()
    }
    
    self.navigation.map((items) => {
      items['items'].map((item) => self.topNavigation.push(item))
    })
    this.numbers = [];
    for (var i = 1; i < 5; i++) {
      this.numbers.push(i)
    }
  }

  ngOnInit() {
    //console.log('navigation', this.navigation);
  }

}

