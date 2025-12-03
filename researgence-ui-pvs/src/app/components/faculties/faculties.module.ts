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
import { SharedModule } from "../../shared/shared.module";
import { FacultiesService } from './faculties.service'
import { FacultiesDetailComponent } from './faculties-detail/faculties-detail.components';
import { PagesRoutes } from './faculties.routing';
import { RouterModule } from '@angular/router';
import { FacultiesListComponent } from './faculties-list/faculties-list.components';
import { HttpClientModule } from '@angular/common/http';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import { FacultyCompareComponent } from './faculty-compare/faculty-compare.component';
import { FacultyEditComponent } from './faculty-edit/faculty-edit.component';
import { FacultyNewComponent } from './faculty-new/faculty-new.component';
import { FacultyViewComponent } from './faculty-view/faculty-view.component';
import { RfsListFacultyComponent}from './rfs-list-faculty/rfs-list-faculty.component';
import { NgxTagsInputBoxModule } from 'ngx-tags-input-box';
import { RfsComponent } from './RFS/rfs.component';
import { DashboardCompareComponent } from './dashboard-compare/dashboard-compare.component';
import { FacultyServiceRequestComponent } from './faculty-service-request/faculty-service-request.component';
import { PublicationDashboardLevelComponent } from './publication-dashboard-level/publication-dashboard-level.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RfsEditComponent } from './rfs-edit/rfs-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AboutUniversityComponent } from './about-university/about-university.component';
import { ResearchPolicyComponent } from './research-policy/research-policy.component';
import { ViceChancellorComponent } from './vice-chancellor/vice-chancellor.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import {ProjectFaculityProfileComponent } from './project-faculity-profile/project-faculity-profile.components';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AgGridComponent } from './faculty-compare/ag-grid/ag-grid.component';


@NgModule({
  declarations: [ FacultiesDetailComponent,FacultiesListComponent, FacultyCompareComponent,FacultyServiceRequestComponent,
    FacultyEditComponent, FacultyNewComponent, RfsListFacultyComponent,DashboardCompareComponent,
    FacultyViewComponent,RfsComponent,PublicationDashboardLevelComponent, RfsEditComponent,
  AboutUniversityComponent,ResearchPolicyComponent,ViceChancellorComponent,ProjectDashboardComponent,ProjectFaculityProfileComponent],
  providers:[FacultiesService,DatePipe],
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
    RouterModule.forChild(PagesRoutes),
    BsDatepickerModule.forRoot(),
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxTagsInputBoxModule,
    HttpClientModule,
    DragDropModule,
    ShareButtonsModule.withConfig({
      debug:true,
    }),

    ShareIconsModule,
    AgGridComponent
  ],

  
})
export class FacultiesModule { }
