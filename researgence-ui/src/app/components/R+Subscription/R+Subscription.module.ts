import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbDatepickerModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from "../../shared/shared.module";
import { RSubscriptionRoutingModule } from './R+Subscription-routing.module';
import { TurnkeyComponent } from './turnkey/turnkey.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { AuthorLinkRendererComponent } from '../faculties/faculty-compare/ag-grid/link-author.component';
import { RouterModule } from '@angular/router';
import { AgGridComponent } from '../faculties/faculty-compare/ag-grid/ag-grid.component';

@NgModule({
  declarations: [
    TurnkeyComponent,AuthorLinkRendererComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    RSubscriptionRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgbDatepickerModule,
    AgGridComponent,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
     TabsModule.forRoot(),
    ShareButtonsModule.withConfig({
      debug:true,
    }),
    // NgxDatatableModule
  ]
})
export class RSubscriptionModule { }
