import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from "../../shared/shared.module";
import { NewrequestRoutingModule } from './Newrequest-routing.module';
import { NewrequestComponent } from './Newrequest/newrequest.component';



@NgModule({
  declarations: [
    NewrequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    NewrequestRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    // NgxDatatableModule
  ]
})
export class NewrequestModule { }
