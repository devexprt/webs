import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  navigationSalesRep: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "salesdashboard/salesdashboard",
          "icon": "sli-chart",
          "title": "Dashboard", 
          "items": [],
          "id": "salesdashboard"
        },
        {
          "url": "saleslead/saleslead",
          "icon": "sli-layers",
          "title": "Sales Lead",
          "items": [],
          "id": "saleslead"
        },
        {
          "url": "regusers/regusers",
          "icon": "sli-user",
          "title": "Registered Users",
          "items": [],
          "id": "requsers"
        }
    
        
      ],
      "id": "other"
    }
  ];

  navigationSupport: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "support/dashboard",
          "icon": "sli-chart",
          "title": "Dashboard", 
          "items": [],
          "id": "supportdashboard"
        },
        {
          "url": "support/tickets",
          "icon": "sli-layers",
          "title": "Tickets",
          "items": [],
          "id": "tickets"
        },
        {
          "url": "support/faq",
          "icon": "sli-question",
          "title": "How to",
          "items": [],
          "id": "howto"
        },
        {
          "url": "support/agents",
          "icon": "sli-user",
          "title": "Agents",
          "items": [],
          "id": "agents"
        }
    
        
      ],
      "id": "other"
    }
  ];

  navigationSupportAgent: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "support/dashboard",
          "icon": "sli-chart",
          "title": "Dashboard", 
          "items": [],
          "id": "supportdashboard"
        },
        {
          "url": "support/tickets",
          "icon": "sli-layers",
          "title": "Tickets",
          "items": [],
          "id": "tickets"
        },
        {
          "url": "support/faq",
          "icon": "sli-question",
          "title": "How to",
          "items": [],
          "id": "howto"
        },
        {
          "url": "support/chat",
          "icon": "sli-bubbles",
          "title": "Chat",
          "items": [],
          "id": "chat"
        }
    
        
      ],
      "id": "other"
    }
  ];

  navigationSupportUser: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "support/tickets",
          "icon": "sli-layers",
          "title": "Tickets",
          "items": [],
          "id": "tickets"
        },
        {
          "url": "support/faq",
          "icon": "sli-question",
          "title": "How to",
          "items": [],
          "id": "howto"
        },
        {
          "url": "support/chat",
          "icon": "sli-bubbles",
          "title": "Chat",
          "items": [],
          "id": "chat"
        }
       
    
        
      ],
      "id": "other"
    }
  ];

  navigationAdmin: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "dashboards/dashboard",
          "icon": "sli-chart",
          "title": "Dashboard",
          "items": [],
          "id": "dashboard"
        },
		{
          "url": "userslist/userslist",
          "icon": "sli-user",
          "title": "Users List",
          "items": [],
          "id": "userslist"
        },
		{
          "url": "companies/companies",
          "icon": "sli-chart",
          "title": "Companies",
          "items": [],
          "id": "companies"
        },
		{
          "url": "#",
          "icon": "sli-puzzle",
          "title": "Packages & Pricing",
          "items": [
            {
              "url": "packages/packages",
              "icon": "",
              "title": "Packages",
              "items": [],
              "id": "packages"
            },
            {
              "url": "features/features",
              "icon": "",
              "title": "Features",
              "items": [],
              "id": "features"
            },
            {
              "url": "view-lisense/view-lisense",
              "icon": "",
              "title": "Licenses",
              "items": [],
              "id": "view-lisense"
            },
          ],
          "id": "packages-pricing"
        },
		{
          "url": "#",
          "icon": "sli-location-pin",
          "title": "Locations",
          "items": [
            {
              "url": "countries/countries",
              "icon": "",
              "title": "Countries",
              "items": [],
              "id": "countries"
            },
            {
              "url": "states/states",
              "icon": "",
              "title": "States",
              "items": [],
              "id": "states"
            },
            {
              "url": "regions/regions",
              "icon": "",
              "title": "Regions",
              "items": [],
              "id": "regions"
            },
          ],
          "id": "Locations"
        },
		{
          "url": "salesrep/salesrep",
          "icon": "sli-layers",
          "title": "Sales Rep",
          "items": [],
          "id": "salesrep"
        },
		{
          "url": "spacepackages/spacepackages",
          "icon": "sli-bag",
          "title": "Space Packages",
          "items": [],
          "id": "spacepackages"
        },
		{
          "url": "saleslead/saleslead",
          "icon": "sli-layers",
          "title": "Sales Lead",
          "items": [],
          "id": "saleslead"
        },
		{
          "url": "spacestats/spacestats",
          "icon": "sli-user",
          "title": "Space Stats",
          "items": [],
          "id": "spacestats"
        },
		{
          "url": "newsletters/newsletters",
          "icon": "sli-book-open",
          "title": "Newsletters",
          "items": [],
          "id": "newsletters"
        }
		
        
      ],
      "id": "other"
    }
  ];

  getNavigationAdmin(): Array<Object> {
    return this.navigationAdmin;
  }
  getNavigationSalesRep(): Array<Object> {
    return this.navigationSalesRep;
  }
  getNavigationSupport(): Array<Object> {
    return this.navigationSupport;
  }
  getNavigationSupportUser(): Array<Object> {
    return this.navigationSupportUser;
  }
  getNavigationSupportAgent(): Array<Object> {
    return this.navigationSupportAgent;
  }

}
