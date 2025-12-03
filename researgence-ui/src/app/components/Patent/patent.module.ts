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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from "../../shared/shared.module";
import { PatentRoutingModule } from './patent-routing.module';
import { PatentMinedbComponent } from './patent-minedb/patent-minedb.component';
import { PatentMineComponent} from './patent-minedb/patent-mine/patent-mine.component';
import { PatentEvaluationComponent } from './patent-evaluation/patent-evaluation.component';
import { PatentAdvanceSearchComponent } from './patent-advance-search/patent-advance-search.component';
import { PatentFeedersystemComponent } from './patent-feedersystem/patent-feedersystem.component';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from '../faculties/faculties.routing';
import { NgxTagsInputBoxModule } from 'ngx-tags-input-box';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { PatentDashboard } from './patent-dashboard/patent-dashboard.component';
import { PatentRfsList } from './patent-rfs-list/patent-rfs-list.component';
import { PatentDashboardLevel } from './patent-dashboard-level/patent-dashboard-level.component';
import { PatentQcApprovalComponent } from "./patent-qc-approval/patent-qc-approval.component";
import { PatentEditComponent } from './patent-edit/patent-edit.component';
import { PatentEditByMineComponent } from "./patent-edit-by-mine/patent-edit-by-mine.component";
import { PatentEditByMineDetailComponent } from "./patent-edit-by-mine/patent-edit-by-mine-detail/patent-edit-by-mine-detail.component";

@NgModule({
  declarations: [
    PatentDashboard,PatentRfsList,PatentEvaluationComponent,PatentFeedersystemComponent,PatentEditByMineDetailComponent,
    PatentMinedbComponent,PatentAdvanceSearchComponent,PatentQcApprovalComponent,PatentEditByMineComponent,
    PatentMineComponent,PatentDashboardLevel,PatentEditComponent
  ],
  providers:[DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    PatentRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    RouterModule.forChild(PagesRoutes),
    BsDatepickerModule.forRoot(),
    NgxTagsInputBoxModule,
    HttpClientModule,
    DragDropModule,
    ShareButtonsModule.withConfig({
      debug:true,
    }),

    ShareIconsModule
    // NgxDatatableModule
  ]
})
export class PatentModule { }
