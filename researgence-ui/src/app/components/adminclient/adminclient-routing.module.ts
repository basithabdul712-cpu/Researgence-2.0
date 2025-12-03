import { AdddfsNewComponent } from './addDfsNew/adddfsNew.component';
import { UserReportComponent } from './user-report/user-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminclientComponent } from './adminclient/adminclient.component';
import { UniversityComponent } from './universitylist/universitylist.component';
import { UserListComponent } from './user-list/user-list.component';
import {AdddfsComponent} from './addDfs/adddfs.component';
import {DfsListComponent} from './dfs-list/dfs-list.component';
import {RfsListComponent} from './rfs-list/rfs-list.component'
import {RfsuniversityComponent} from './rfsuniversity/rfsuniversity.component';
import {RfsApprovalComponent} from './rfs-approval/rfs-approval.component';
import { RfsAdvanceSearchComponent } from './rfs-advance-search/rfs-advance-search.component';
import {AdminServiceRequestsComponent} from './service-requests/admin-service-requests.component';
import { RequestEvaluationComponent} from './request-evaluation/request-evaluation.component';
import{SupportadminRequestComponent} from './supportadmin-request/supportadmin-request.component';
import {AdminrequestAdvanceSearchComponent} from './advance-search-service-request/adminrequest-advance-search.component';
import {DfsEditComponent} from '../faculties/dfs-edit/dfs-edit.component';
import {DfsPublicationEditComponent} from '../faculties/dfs-publication-edit/dfs-publication-edit.component';
import{ ClientUsageReportComponent } from './client-usage-report/client-usage-report.component';
import { SourceRequestComponent } from './DFS-source-request/source-request.component';
import { SupportPubMineComponent } from './support-pub-mine/support-pub-mine.component';
import { LibrarianUncatogorypublicationComponent } from "./librarian-uncatogory-publication/librarian-uncatogorypublication.component";
import { SupportPubMineDetailComponent } from './support-pub-mine-detail/support-pub-mine-detail.component'; 
import { FacultyCompareTimelineComponent } from '../R+Subscription/faculty-compare-timeline/faculty-compare-timeline.component';
import { PublicationQcListComponent } from "./publication-qc-list/publication-qc-list.component";
import { SubcriptionReportComponent } from './subcription-report/subcription-report.component';

const routes: Routes = [
  {
    path: '',
    component: AdminclientComponent,
    data: {
      title: "",
      breadcrumb: ""
    }
  },
  { path:'universitySelect',component: UniversityComponent},
  { path:'user/screen',component: UserListComponent},
  {path:'universitySelect/DFS/addDfs',component: AdddfsComponent},
  {path:'universitySelect/DFS/add/:type',component:AdddfsNewComponent},
  {path:'universitySelect/DFS/viewDfs/:university',component: DfsListComponent},
  {path:'universitySelect/DFS/view/support/publication/:university',component: PublicationQcListComponent},
  {path:'universitySelect/RFS/view/:univ', component:RfsListComponent},
  {path:'universitySelect/RFS/:university', component:RfsuniversityComponent},
  {path:'universitySelect/RFS/approval/:RFSRequestId/:status/:publicationId', component:RfsApprovalComponent},
  {path:'rfslist/advancesearch/:univ', component:RfsAdvanceSearchComponent},
  {path:'service-request/:univ',component:AdminServiceRequestsComponent},
  {path:'service/evaluation/:univ/:serviceid',component:RequestEvaluationComponent},
  {path:'service-request/advance/search',component:AdminrequestAdvanceSearchComponent},
  {path:'admin-service-request',component:SupportadminRequestComponent},
  {path:'dfs-editor/editor/:publicationId/:type/:univId',component:DfsEditComponent},
  {path:'dfs-editor/editor/support/new/:publicationId/:type/:univId',component:DfsPublicationEditComponent},
  {path:'main/report',component:UserReportComponent},
  {path:'main/ACSR/report',component:UserReportComponent},
  {path:'main/PSR/report',component:UserReportComponent},
  {path:'report/clientusage',component:ClientUsageReportComponent},
  {path:'DFS/SUPPORT/REQUEST', component:SourceRequestComponent},
  {path:'LIBRARIAN/PUBLICATION', component:LibrarianUncatogorypublicationComponent},
  {path:'PUBLICATION/MINESEARCH', component:SupportPubMineComponent},
  {path:'PUBLICATION/MINESEARCH/DETAIL', component:SupportPubMineDetailComponent},
  {path:'PERFORMANCEANALYSIS/TIMELINE', component:FacultyCompareTimelineComponent},
  {path:'subcription/report', component:SubcriptionReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminclientRoutingModule { }