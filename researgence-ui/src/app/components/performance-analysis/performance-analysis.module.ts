
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PerformanceAnalysisComponent } from './performance-analysis.component';
import { PRSKRAEligibiltyListComponent } from './prs-kra-eligibilty-list/prs-kra-eligibilty-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridComponent } from '../faculties/faculty-compare/ag-grid/ag-grid.component';
import { PerformanceAnalysisRoutingModule } from './performance-analysis-routing.module';
import { PRSKRAScoringComponent } from './prs-kra-scoring/prs-kra-scoring.component';


@NgModule({
  declarations: [PerformanceAnalysisComponent, PRSKRAEligibiltyListComponent,PRSKRAScoringComponent],
  imports: [
    PerformanceAnalysisRoutingModule,
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    BsDatepickerModule.forRoot(),
    AgGridComponent,
    SharedModule,
  ],
  providers:[AuthService],

})
export class PerformanceAnalysisModule { }
