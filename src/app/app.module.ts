import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CustomRequestOptions } from 'app/services/CustomRequestOptions';
import { DataTableModule} from "angular2-datatable"; 
import { SearchPipe } from 'app/pipes/search.pipe';

import { AppComponent } from './app.component';
import { AccountingJsComponent } from './plugins/accounting-js';
import { AlertsComponent } from './notifications/alerts';
import { AngularCliComponent } from './documentation/angular-cli';
import { AnimationDelaysComponent } from './extras/animation-delays';
import { AvatarsComponent } from './extras/avatars';
import { BackdropsComponent } from './elements/backdrops';
import { BadgesComponent } from './ui-elements/badges';
import { BreadcrumbsComponent } from './ui-elements/breadcrumbs';
import { ButtonsComponent } from './ui-elements/buttons';
import { ChangelogComponent } from './documentation/changelog';
import { ChartistComponent } from './charts/chartist';
import { CodeStructureComponent } from './documentation/code-structure';
import { ComingSoonComponent } from './pages/coming-soon';
import { CreateAccountComponent } from './pages/create-account';
import { CreditsComponent } from './documentation/credits';
import { CustomizationComponent } from './documentation/customization';
import { DashboardComponent } from './dashboards/dashboard';
import { DatatableComponent } from './tables/datatable';
import { DefaultFormsComponent } from './forms/default-forms';
import { ValidationComponent } from './forms/validation';
import { StepsComponent } from './forms/steps';
import { DefaultTablesComponent } from './tables/default-tables';
import { DropdownsComponent } from './ui-elements/dropdowns';
import { EasyPieChartComponent } from './charts/easy-pie-chart';
import { EmptyPageComponent } from './pages/empty-page';
import { ErrorPageComponent } from './pages/error-page';
import { FileUploadsComponent } from './forms/file-uploads';
import { FlagsComponent } from './icons/flags';
import { FontAwesomeComponent } from './icons/font-awesome';
import { GoogleMapsComponent } from './maps/google-maps';
import { ImagesComponent } from './ui-elements/images';
import { InstallationComponent } from './documentation/installation';
import { IoniconsComponent } from './icons/ionicons';
import { JqueryTreegridComponent } from './tables/jquery-treegrid';
import { Jumbotron1Component } from './elements/jumbotron-1';
import { Jumbotron2Component } from './elements/jumbotron-2';
import { LayoutComponent } from './documentation/layout';
import { LeftSidebar1Component } from './elements/left-sidebar-1';
import { ListsComponent } from './ui-elements/lists';
import { LoginComponent } from './pages/login';
import { MaterialDesignIconsComponent } from './icons/material-design-icons';
import { ModalsComponent } from './notifications/modals';
import { MomentJsComponent } from './plugins/moment-js';
import { MorrisJsComponent } from './charts/morris-js';
import { Navbar1Component } from './elements/navbar-1';
import { Nvd3Component } from './charts/nvd3';
import { PaginationComponent } from './ui-elements/pagination';
import { PeityComponent } from './charts/peity';
import { PopoversComponent } from './notifications/popovers';
import { ProgressBarsComponent } from './ui-elements/progress-bars';
import { ResetPasswordComponent } from './pages/reset-password';
import { SetPasswordComponent } from './pages/set-password';
import { RightSidebar1Component } from './elements/right-sidebar-1';
import { SampleModalsComponent } from './elements/sample-modals';
import { SimpleLineIconsComponent } from './icons/simple-line-icons';
import { SlidersComponent } from './forms/sliders';
import { SocialMediaButtonsComponent } from './ui-elements/social-media-buttons';
import { StylesComponent } from './documentation/styles';
import { SubscribeComponent } from './pages/subscribe';
import { TableExportComponent } from './tables/table-export';
import { TabsComponent } from './ui-elements/tabs';
import { TooltipsComponent } from './notifications/tooltips';
import { TopNavigation1Component } from './elements/top-navigation-1';
import { TopNavigation2Component } from './elements/top-navigation-2';
import { TypographyComponent } from './ui-elements/typography';
import { UnderMaintenanceComponent } from './pages/under-maintenance';
import { UnlockAccountComponent } from './pages/unlock-account';
import { UserProfileComponent } from './pages/user-profile';
import { VectorMapsComponent } from './maps/vector-maps';
import { WeatherIconsComponent } from './icons/weather-icons';
import { CalendarComponent } from './apps/calendar';
import { SweetAlert2Component } from './notifications/sweet-alert-2';
import { ToastrComponent } from './notifications/toastr';
import { ActivityWidgetsComponent } from './widgets/activity-widgets';
import { AreaChartWidgetsComponent } from './widgets/area-chart-widgets';
import { BarChartWidgetsComponent } from './widgets/bar-chart-widgets';
import { DonutChartWidgetsComponent } from './widgets/donut-chart-widgets';
import { IconWidgetsComponent } from './widgets/icon-widgets';
import { LineChartWidgetsComponent } from './widgets/line-chart-widgets';
import { PieChartWidgetsComponent } from './widgets/pie-chart-widgets';
import { TableWidgetsComponent } from './widgets/table-widgets';
import { TextWidgetsComponent } from './widgets/text-widgets';
import { TimelineWidgetsComponent } from './widgets/timeline-widgets';
import { UserWidgetsComponent } from './widgets/user-widgets';
import { SidebarHeadingComponent } from './elements/sidebar-heading';
import { SidebarWidget1Component } from './elements/sidebar-widget-1';
import { SidebarWidget2Component } from './elements/sidebar-widget-2';
import { DropdownGridComponent } from './elements/dropdown-grid';
import { DropdownTasksComponent } from './elements/dropdown-tasks';
import { DropdownMessagesComponent } from './elements/dropdown-messages';
import { DropdownUserComponent } from './elements/dropdown-user';
import { DropdownFlagsComponent } from './elements/dropdown-flags';
import { DatepickerComponent } from './forms/datepicker';
import { CardsComponent } from './ui-elements/cards';
import { TypeaheadComponent } from './forms/typeahead';
import { UserslistComponent } from './userslist/userslist.component';
import { CompaniesComponent } from './companies/companies.component';
import { SalesrepComponent } from './salesrep/salesrep.component';
import { AssociativesComponent } from './associatives/associatives.component';
import { JobsComponent } from './jobs/jobs.component';
import { SpacepackagesComponent } from './spacepackages/spacepackages.component';
import { SalesleadComponent } from './saleslead/saleslead.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { SpacestatsComponent } from './spacestats/spacestats.component';
import { PackagesComponent } from './packages/packages.component';
import { FeaturesComponent } from './features/features.component';
import { ViewLicenseComponent } from './view-license/view-license.component';
import { CountriesComponent } from './countries/countries.component';
import { StatesComponent } from './states/states.component';
import { RegionsComponent } from './regions/regions.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SalesdashboardComponent } from './salesdashboard/salesdashboard.component';
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { FrontindexComponent } from './frontindex/frontindex.component';
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { RegusersComponent } from './regusers/regusers.component';
import { FeatureComponent } from './feature/feature.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignupComponent } from './signup/signup.component';
import { BlogComponent } from './blog/blog.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SupportComponent } from './support/support.component';
import { SupportdashboardComponent } from './supportdashboard/supportdashboard.component';
import { FaqComponent } from './faq/faq.component';
import { AgentsComponent } from './agents/agents.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { ChatsComponent } from './chats/chats.component';
import { BlogdetailComponent } from './blogdetail/blogdetail.component';

LoginComponent
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SweetAlert2Component,
    ToastrComponent,
    SearchPipe,
    AccountingJsComponent,
    AlertsComponent,
    AngularCliComponent,
    AnimationDelaysComponent,
    AvatarsComponent,
    BackdropsComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    ChangelogComponent,
    ChartistComponent,
    CodeStructureComponent,
    ComingSoonComponent,
    CreateAccountComponent,
    CreditsComponent,
    CustomizationComponent,
    DashboardComponent,
    DatatableComponent,
    DefaultFormsComponent,
    ValidationComponent,
    StepsComponent,
    DefaultTablesComponent,
    DropdownsComponent,
    EasyPieChartComponent,
    EmptyPageComponent,
    ErrorPageComponent,
    FileUploadsComponent,
    FlagsComponent,
    FontAwesomeComponent,
    GoogleMapsComponent,
    ImagesComponent,
    InstallationComponent,
    IoniconsComponent,
    JqueryTreegridComponent,
    Jumbotron1Component,
    Jumbotron2Component,
    LayoutComponent,
    LeftSidebar1Component,
    ListsComponent,
    LoginComponent,
    MaterialDesignIconsComponent,
    ModalsComponent,
    MomentJsComponent,
    MorrisJsComponent,
    Navbar1Component,
    Nvd3Component,
    PaginationComponent,
    PeityComponent,
    PopoversComponent,
    ProgressBarsComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    RightSidebar1Component,
    SampleModalsComponent,
    SimpleLineIconsComponent,
    SlidersComponent,
    SocialMediaButtonsComponent,
    StylesComponent,
    SubscribeComponent,
    TableExportComponent,
    TabsComponent,
    TooltipsComponent,
    TopNavigation1Component,
    TopNavigation2Component,
    TypographyComponent,
    UnderMaintenanceComponent,
    UnlockAccountComponent,
    UserProfileComponent,
    VectorMapsComponent,
    WeatherIconsComponent,
    ActivityWidgetsComponent,
    AreaChartWidgetsComponent,
    BarChartWidgetsComponent,
    DonutChartWidgetsComponent,
    IconWidgetsComponent,
    LineChartWidgetsComponent,
    PieChartWidgetsComponent,
    TableWidgetsComponent,
    TextWidgetsComponent,
    TimelineWidgetsComponent,
    UserWidgetsComponent,
    SidebarHeadingComponent,
    SidebarWidget1Component,
    SidebarWidget2Component,
    DropdownGridComponent,
    DropdownTasksComponent,
    DropdownMessagesComponent,
    DropdownUserComponent,
    DropdownFlagsComponent,
    DatepickerComponent,
    CardsComponent,
    TypeaheadComponent,
    UserslistComponent,
    CompaniesComponent,
    SalesrepComponent,
    AssociativesComponent,
    JobsComponent,
    SpacepackagesComponent,
    SalesleadComponent,
    NewslettersComponent,
    SpacestatsComponent,
    PackagesComponent,
    FeaturesComponent,
    ViewLicenseComponent,
    CountriesComponent,
    StatesComponent,
    RegionsComponent,
    ProfileSettingsComponent,
    SalesdashboardComponent,
    RegusersComponent,
    FrontheaderComponent,
    FrontindexComponent,
    FrontfooterComponent,
    FeatureComponent,
    PricingComponent,
    SignupComponent,
    BlogComponent,
    AboutusComponent,
    ContactusComponent,
    SupportComponent,
    SupportdashboardComponent,
    FaqComponent,
    AgentsComponent,
    TicketsComponent,
    TicketdetailsComponent,
    ChatsComponent,
    BlogdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: FrontindexComponent },
      { path: 'apps/calendar', component: CalendarComponent },
      { path: 'notifications/sweet-alert-2', component: SweetAlert2Component },
      { path: 'notifications/toastr', component: ToastrComponent },
      { path: 'charts/chartist', component: ChartistComponent },
      { path: 'charts/easy-pie-chart', component: EasyPieChartComponent },
      { path: 'charts/morris-js', component: MorrisJsComponent },
      { path: 'charts/nvd3', component: Nvd3Component },
      { path: 'charts/peity', component: PeityComponent },
      { path: 'dashboards/dashboard', component: DashboardComponent },
      { path: 'documentation/angular-cli', component: AngularCliComponent },
      { path: 'documentation/changelog', component: ChangelogComponent },
      { path: 'documentation/code-structure', component: CodeStructureComponent },
      { path: 'documentation/credits', component: CreditsComponent },
      { path: 'documentation/customization', component: CustomizationComponent },
      { path: 'documentation/installation', component: InstallationComponent },
      { path: 'documentation/layout', component: LayoutComponent },
      { path: 'documentation/styles', component: StylesComponent },
      { path: 'extras/animation-delays', component: AnimationDelaysComponent },
      { path: 'extras/avatars', component: AvatarsComponent },
      { path: 'forms/validation', component: ValidationComponent },
      { path: 'forms/steps', component: StepsComponent },
      { path: 'forms/default-forms', component: DefaultFormsComponent },
      { path: 'forms/file-uploads', component: FileUploadsComponent },
      { path: 'forms/sliders', component: SlidersComponent },
      { path: 'forms/datepicker', component: DatepickerComponent },
      { path: 'forms/typeahead', component: TypeaheadComponent },
      { path: 'icons/flags', component: FlagsComponent },
      { path: 'icons/font-awesome', component: FontAwesomeComponent },
      { path: 'icons/ionicons', component: IoniconsComponent },
      { path: 'icons/material-design-icons', component: MaterialDesignIconsComponent },
      { path: 'icons/simple-line-icons', component: SimpleLineIconsComponent },
      { path: 'icons/weather-icons', component: WeatherIconsComponent },
      { path: 'maps/google-maps', component: GoogleMapsComponent },
      { path: 'maps/vector-maps', component: VectorMapsComponent },
      { path: 'notifications/alerts', component: AlertsComponent },
      { path: 'notifications/modals', component: ModalsComponent },
      { path: 'notifications/popovers', component: PopoversComponent },
      { path: 'notifications/tooltips', component: TooltipsComponent },
      { path: 'pages/coming-soon', component: ComingSoonComponent },
      { path: 'pages/create-account', component: CreateAccountComponent },
      { path: 'pages/empty-page', component: EmptyPageComponent },
      { path: 'pages/error-page', component: ErrorPageComponent },
      { path: 'pages/login', component: LoginComponent },
      { path: 'pages/login/:status/:userId', component: LoginComponent },
      { path: 'pages/set-password/:code/:token', component: SetPasswordComponent },
      { path: 'pages/set-password', component: SetPasswordComponent },
      { path: 'pages/reset-password', component: ResetPasswordComponent },
      { path: 'pages/subscribe', component: SubscribeComponent },
      { path: 'pages/under-maintenance', component: UnderMaintenanceComponent },
      { path: 'pages/unlock-account', component: UnlockAccountComponent },
      { path: 'pages/user-profile/:id', component: UserProfileComponent },
      { path: 'plugins/accounting-js', component: AccountingJsComponent },
      { path: 'plugins/moment-js', component: MomentJsComponent },
      { path: 'tables/datatable', component: DatatableComponent },
      { path: 'tables/default-tables', component: DefaultTablesComponent },
      { path: 'tables/jquery-treegrid', component: JqueryTreegridComponent },
      { path: 'tables/table-export', component: TableExportComponent },
      { path: 'ui-elements/badges', component: BadgesComponent },
      { path: 'ui-elements/breadcrumbs', component: BreadcrumbsComponent },
      { path: 'ui-elements/buttons', component: ButtonsComponent },
      { path: 'ui-elements/cards', component: CardsComponent },
      { path: 'ui-elements/dropdowns', component: DropdownsComponent },
      { path: 'ui-elements/images', component: ImagesComponent },
      { path: 'ui-elements/lists', component: ListsComponent },
      { path: 'ui-elements/pagination', component: PaginationComponent },
      { path: 'ui-elements/progress-bars', component: ProgressBarsComponent },
      { path: 'ui-elements/social-media-buttons', component: SocialMediaButtonsComponent },
      { path: 'ui-elements/tabs', component: TabsComponent },
      { path: 'ui-elements/typography', component: TypographyComponent },
      { path: 'widgets/activity-widgets', component: ActivityWidgetsComponent },
      { path: 'widgets/area-chart-widgets', component: AreaChartWidgetsComponent },
      { path: 'widgets/bar-chart-widgets', component: BarChartWidgetsComponent },
      { path: 'widgets/donut-chart-widgets', component: DonutChartWidgetsComponent },
      { path: 'widgets/icon-widgets', component: IconWidgetsComponent },
      { path: 'widgets/line-chart-widgets', component: LineChartWidgetsComponent },
      { path: 'widgets/pie-chart-widgets', component: PieChartWidgetsComponent },
      { path: 'widgets/table-widgets', component: TableWidgetsComponent },
      { path: 'widgets/text-widgets', component: TextWidgetsComponent },
      { path: 'widgets/timeline-widgets', component: TimelineWidgetsComponent },
      { path: 'widgets/user-widgets', component: UserWidgetsComponent },
      { path: 'userslist/userslist', component: UserslistComponent },
	  { path: 'companies/companies', component: CompaniesComponent },
	  { path: 'salesrep/salesrep', component: SalesrepComponent },
	  { path: 'associatives/associatives', component: AssociativesComponent },
	  { path: 'jobs/jobs', component: JobsComponent },
	  { path: 'spacepackages/spacepackages', component: SpacepackagesComponent },
	  { path: 'saleslead/saleslead', component: SalesleadComponent },
	  { path: 'newsletters/newsletters', component: NewslettersComponent },
	  { path: 'spacestats/spacestats', component: SpacestatsComponent },
	  { path: 'packages/packages', component: PackagesComponent },
	  { path: 'features/features', component: FeaturesComponent },
	  { path: 'view-lisense/view-lisense', component: ViewLicenseComponent },
	  { path: 'countries/countries', component: CountriesComponent },
	  { path: 'states/states', component: StatesComponent },
    { path: 'regions/regions', component: RegionsComponent },
    { path: 'profile-settings/profile-settings', component: ProfileSettingsComponent },
    { path: 'salesdashboard/salesdashboard', component: SalesdashboardComponent },
    { path: 'frontindex/frontindex', component: FrontindexComponent },
	  { path: 'regusers/regusers', component: RegusersComponent },
    { path: 'frontindex/feature', component: FeatureComponent },
    { path: 'frontindex/pricing', component: PricingComponent },
    { path: 'frontindex/signup', component: SignupComponent },
    { path: 'frontindex/signup/:code/:userId/:userEmail', component: SignupComponent },
    { path: 'frontindex/blog', component: BlogComponent },
    { path: 'frontindex/aboutus', component: AboutusComponent },
    { path: 'frontindex/contact', component: ContactusComponent },
    { path: 'support/login', component: SupportComponent },
    { path: 'support/dashboard', component: SupportdashboardComponent },
    { path: 'support/faq', component: FaqComponent },
    { path: 'support/agents', component: AgentsComponent },
    { path: 'support/tickets', component: TicketsComponent },
    { path: 'support/chat', component: ChatsComponent },
    { path: 'support/ticketdetails/:ticketId', component: TicketdetailsComponent },
      { path: '**', component: ErrorPageComponent }
    ])
  ],
  providers: [
  { provide: RequestOptions, useClass: CustomRequestOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
