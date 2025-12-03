import { RouterModule, Routes } from '@angular/router';
import { FacultiesListComponent } from './faculties-list/faculties-list.components'
import {  FacultiesDetailComponent} from './faculties-detail/faculties-detail.components'
import { FacultyCompareComponent } from './faculty-compare/faculty-compare.component';
import { FacultyEditComponent } from './faculty-edit/faculty-edit.component';
import { FacultyNewComponent } from './faculty-new/faculty-new.component';
import { FacultyViewComponent } from './faculty-view/faculty-view.component';
import { DashboardCompareComponent } from './dashboard-compare/dashboard-compare.component';
import { RfsComponent } from './RFS/rfs.component' ;
import { RfsListFacultyComponent} from './rfs-list-faculty/rfs-list-faculty.component';
import { FacultyServiceRequestComponent } from './faculty-service-request/faculty-service-request.component';
import { PublicationDashboardLevelComponent } from "./publication-dashboard-level/publication-dashboard-level.component";
import { RfsEditComponent } from './rfs-edit/rfs-edit.component';
import { AboutUniversityComponent } from './about-university/about-university.component';
import { ViceChancellorComponent } from './vice-chancellor/vice-chancellor.component';
import { ResearchPolicyComponent } from './research-policy/research-policy.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectFaculityProfileComponent } from './project-faculity-profile/project-faculity-profile.components';

export const PagesRoutes: Routes = [
    { path: ':id', component: FacultiesDetailComponent},
    { path: '', component: FacultiesListComponent },
    {path:'compare/fac',component:FacultyCompareComponent},
    {path:'edit/screen/edit/:UniversityId/:UserId',component:FacultyEditComponent},
    {path:'new/screen',component:FacultyNewComponent},
    {path:'view/screen/:UniversityId/:UserId',component:FacultyViewComponent}, 
    {path:'faculty/rfs',component:RfsComponent},
    {path:'Support/MyAdditions',component:RfsListFacultyComponent},
    {path:'Support/MyRequests', component:FacultyServiceRequestComponent},
    {path:'Publications/Dashboard/level/:id/:levelid/:layer/:name', component:PublicationDashboardLevelComponent},
    {path:'faculty/rfs-edit/:requestId',component:RfsEditComponent},
    {path:'compare/dashboard',component:DashboardCompareComponent},
    {path:'about/univ',component:AboutUniversityComponent},
    {path:'vice/univ',component:ViceChancellorComponent},
    {path:'research/univ',component:ResearchPolicyComponent},
    {path:'Project/Dashboard',component:ProjectDashboardComponent},
    {path:'Project/Profile',component:ProjectFaculityProfileComponent},
    { path: '**', redirectTo: '' }
];



