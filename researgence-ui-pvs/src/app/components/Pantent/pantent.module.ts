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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from "../../shared/shared.module";
import { PantentRoutingModule } from './pantent-routing.module';
import { PantentDashboard } from './pantent-dashboard/pantent-dashboard.component';
import { PatentMinedbComponent } from './patent-minedb/patent-minedb.component';
import { PatentMineComponent} from './patent-minedb/patent-mine/patent-mine.component';
import { PantentDashboardLevel } from './pantent-dashboard-level/pantent-dashboard-level.component';

@NgModule({
  declarations: [
    PantentDashboard,
    PatentMinedbComponent,
    PatentMineComponent,PantentDashboardLevel
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    PantentRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // NgxDatatableModule
  ]
})
export class PantentModule { }
