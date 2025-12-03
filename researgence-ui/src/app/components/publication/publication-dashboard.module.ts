
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { SharedModule } from "./../../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import { NgxTagsInputBoxModule } from 'ngx-tags-input-box';
import { PublicationDashboardComponent } from './publication-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import {routes} from './publication-dashboard.routing';

@NgModule({
    declarations: [ PublicationDashboardComponent],
    providers:[DatePipe],
    imports: [
  
      NgxPaginationModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      CarouselModule,
      NgbModule,
      ChartistModule,
      NgChartsModule,
      CountToModule,
      RouterModule.forChild(routes),
      BsDatepickerModule.forRoot(),
      NgxChartsModule,
      Ng2GoogleChartsModule,
      SharedModule,
      NgxTagsInputBoxModule,
      HttpClientModule,
      ShareButtonsModule.withConfig({
        debug:true,
      }),
  
      ShareIconsModule
      
  
    ],
  
    
  })
export class PublicationDashboardModule {}