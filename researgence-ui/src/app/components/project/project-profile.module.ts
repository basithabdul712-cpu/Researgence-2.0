import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard-profile/project-dashboard/project-dashboard.component';
import { ProjectFacultyProfileComponent } from './project-faculty-profile/project-faculty-profile/project-faculty-profile.component';
import { ProjectMineComponent } from './project-mine/project-mine/project-mine.component';
import { ProjectSearchComponent } from './project-search/project-search/project-search.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import {ProjectProfileRoutingModule} from './project-profile-routing.module';
import { ProjectDashboardLevel} from './project-dashboard-level/project-dashboard-level.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { AddedProjectListComponent } from './added-project-list/added-project-list.component';
import { ProjectUserDetailComponent } from "./project-user-detail/project-user-detail.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectEditByMineComponent } from './project-edit-by-mine/project-edit-by-mine.component';
import { ProjectQCComponent } from './project-qc/project-qc.component';
import { ProjectEditByMineDetailComponent } from './project-edit-by-mine/project-edit-by-mine-detail/project-edit-by-mine-detail.component';
import { ProjectAdminEditComponent } from './project-admin-edit/project-admin-edit.component';
import { ProjectUserDetailEditComponent } from './project-user-detail-edit/project-user-detail-edit.component';

@NgModule({
  declarations: [ProjectDashboardComponent, ProjectFacultyProfileComponent, AddedProjectListComponent,
    ProjectMineComponent, ProjectSearchComponent,ProjectDashboardLevel,ProjectUserDetailComponent,ProjectEditByMineComponent,ProjectQCComponent, ProjectEditByMineDetailComponent, ProjectAdminEditComponent, ProjectUserDetailEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ProjectProfileRoutingModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    DragDropModule
                        
  ]
})
export class ProjectProfileModule {


 }
