import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDashboardLevel } from './project-dashboard-level/project-dashboard-level.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard-profile/project-dashboard/project-dashboard.component';
import { ProjectFacultyProfileComponent } from './project-faculty-profile/project-faculty-profile/project-faculty-profile.component';
import { ProjectMineComponent } from './project-mine/project-mine/project-mine.component';
import { ProjectSearchComponent } from './project-search/project-search/project-search.component';
import { AddedProjectListComponent } from "./added-project-list/added-project-list.component";
import { ProjectUserDetailComponent } from './project-user-detail/project-user-detail.component';
import { ProjectEditByMineComponent } from './project-edit-by-mine/project-edit-by-mine.component';
import { ProjectQCComponent } from './project-qc/project-qc.component';
import { ProjectEditByMineDetailComponent } from './project-edit-by-mine/project-edit-by-mine-detail/project-edit-by-mine-detail.component';
import { ProjectAdminEditComponent } from './project-admin-edit/project-admin-edit.component';
import { ProjectUserDetailEditComponent } from './project-user-detail-edit/project-user-detail-edit.component';
import { FacultiesDetailComponent } from '../faculties/faculties-detail/faculties-detail.components';


const routes: Routes = [
  {path: 'Dashboard', component: ProjectDashboardComponent},
  {path: 'Dashboard/level/:id/:levelid/:layer/:name', component: ProjectDashboardLevel},
  {path: 'profile',component:ProjectFacultyProfileComponent },
  {path: 'mineSearch',component: ProjectMineComponent},
  {path:'mineResult', component: ProjectSearchComponent},
  {path:'added/list', component: AddedProjectListComponent},
  {path:'user/details/:projectId', component: ProjectUserDetailComponent},
  {path:'user/details/edit/:projectId', component: ProjectUserDetailEditComponent},
  {path: 'edit/mine/search',component: ProjectEditByMineComponent},
  {path:'Admin/QC/:univ', component: ProjectQCComponent},
  {path: 'edit/mine/search/detail',component: ProjectEditByMineDetailComponent},
  {path:'admin/details/:projectId/:univ', component: ProjectAdminEditComponent},
  {path:'user/edit/:id', component: FacultiesDetailComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProfileRoutingModule  { }
